import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
    progress: {
        margin: theme.spacing.unit * 2,
      },
});

const mercados = [
    {
        value: "USA",
        label: "NASDAQ"
    },
    {
        value: "USA2",
        label: "NYSE"
    },
    {
        value: "USA3",
        label: "AMEX"
    }
];

// In 'state', we put the "value" field of each variable so it
// will be displayed by default in the form
class Formulario extends React.Component {
    state = {
        accion: '',
        mercado: '',
        fecha_inicio: '',
        fecha_termino: '',
        trayectorias: '1',
        tasa_riesgo: '0.000',
        dir: "formulario",
        options: [],
        from_form: true,
        timestamp: '',
        open: false,
        charged: true,
    };

    handleClick = (state) => {
        this.setState({ open: true, charged: false});
        this.callYF(state);
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ open: false , charged: true});
      };


    callYF = (state) => {
        axios.get('http://localhost:5000/api/yf', {
            params: state,
            'timeout': 10000
        }).then(res => {
            let data = res.data;
            let d = new Date();
            //this.state.options.push(data); aquí hay problemas
            //this.setState({...this.state, options: data});
            this.props.add({ ...this.state, options: data }, d.toString());
            console.log("THIS IS DSA OPTIONS");
            this.setState({charged: true})
            setTimeout(() => {
                this.handleClose();
            },3000)
        }).catch(function (error) {
            console.log(error)
        })
    };

    render() {
        console.log(this.props.value);
        const { classes } = this.props;
        //let d = new Date();
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    required
                    id="accion"
                    label="Acción a analizar"
                    placeholder="Acción"
                    className={classes.textField}
                    value={this.state.accion}
                    onChange={this.handleChange('accion')}
                    helperText="Ej: MSFT, MDB, QCOM, ..."
                    margin="normal"
                />
                <TextField
                    required
                    id="mercado"
                    select
                    label="Mercado"
                    className={classes.textField}
                    value={this.state.mercado}
                    onChange={this.handleChange('mercado')}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu
                        }
                    }}
                    helperText="Por favor, ingrese mercado a cotizar"
                    margin="normal"
                >
                    {mercados.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    required
                    id="fecha-inicio"
                    label="Fecha de Inicio"
                    type="date"
                    className={classes.textField}
                    onChange={this.handleChange('fecha_inicio')}
                    InputLabelProps={{
                        shrink: true
                    }}
                    helperText="Ingrese fecha de inicio de simulación"
                    margin="normal"
                />
                <TextField
                    required
                    id="fecha-termino"
                    label="fecha-termino"
                    type="date"
                    className={classes.textField}
                    onChange={this.handleChange('fecha_termino')}
                    InputLabelProps={{
                        shrink: true
                    }}
                    helperText="Ingrese fecha de término de simulación"
                    margin="normal"
                />
                <TextField
                    required
                    id="trayectorias"
                    label="Trayectorias"
                    value={this.state.trayectorias}
                    onChange={this.handleChange('trayectorias')}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true
                    }}
                    helperText="Ingrese N° de trayectorias a simular"
                    margin="normal"
                />
                <TextField
                    required
                    id="tasa-riesgo"
                    label="Tasa de Riesgo"
                    value={this.state.tasa_riesgo}
                    onChange={this.handleChange('tasa_riesgo')}
                    className={classes.textField}
                    helperText="Ingrese tasa de riesgo (%)"
                    margin="normal"
                />
                <Button size="small" color="secondary" variant="outlined" onClick={() => {
                    //this.props.add(this.state, d.toString());
                    this.handleClick(this.state);
                }}>Predecir opciones con Redux</Button>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={
                        (this.state.charged == false)? <div>
                        <CircularProgress className={classes.progress} color="secondary" size={30}/>
                        <span id="message-id">Calculando opciones... </span>
                        </div>:<div>Listoco</div>
                    }
                />

            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        value: state
    }
};

const mapDispatchToProps = dispatch => {
    return {
        add: (data_in, time_in) =>
            dispatch({
                type: 'ADD',
                data: data_in,
                timestamp: time_in
            })
    }
};

Formulario.propTypes = {
    classes: PropTypes.object.isRequired,
    retrieveForm: PropTypes.func
};

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Formulario);