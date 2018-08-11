import React from 'react';
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
class FormularioLocal extends React.Component {
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
    };
    

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };



    render() {
        const { classes } = this.props;
        let d = new Date();
        return (
            <div>
                Formulario Local
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

                <Button size="small" color="secondary" variant="outlined" onClick={() => {
                    this.props.add(this.state,d.toString());
                    this.handleClick;
                }}>Predecir opciones con Redux</Button>
            </form>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        value: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add: (data_in, time_in) =>
            dispatch({
                type: 'ADD',
                data: data_in,
                timestamp: time_in 
            })
    }
}

FormularioLocal.propTypes = {
    classes: PropTypes.object.isRequired,
    retrieveForm: PropTypes.func
};

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(FormularioLocal);