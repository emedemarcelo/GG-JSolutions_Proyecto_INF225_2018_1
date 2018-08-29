import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Snackbar from '@material-ui/core/Snackbar';
import ReactFileReader from 'react-file-reader';
import Papa from 'papaparse';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom'

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
        fileJSON: [],
        open: false,
        charged: true,
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


    handleFiles = (files) => {
        
        var reader = new FileReader();
        reader.onload = function(e) {
            let data;
            let self = this;
        }

        reader.readAsText(files[0]);

        Papa.parse(files[0], {
            header: true,
            delimiter: ",",
            trimHeaders: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            beforeFirstChunk: function(chunk) {
                var rows = chunk.split( /\r\n|\r|\n/ );
                var headings = rows[0].toLowerCase();
                var headers = headings.split(",");
                headers[5] = "adjClose"
                headings = headers.join(",");
                rows[0] = headings;
                console.log(rows[0]);
                return rows.join("\r\n");
            },

            complete: (results) =>{
                this.setState({fileJSON: results.data})
            }
        });

    }

    handleClick = (state) => {
        this.setState({ open: true, charged: false});
        this.callLocal(state);
    }

    callLocal = (state) => {
        axios.get('http://localhost:5000/api/local', {
            params: state
            //'timeout': 10000
        }).then(res => {
            let data = res.data;
            let d = new Date();
            //this.state.options.push(data); aquí hay problemas
            //this.setState({...this.state, options: data});
            this.props.add({ ...this.state, options: data }, d.toString());
            console.log("THIS IS DSA LOCAL OPTIONS");
            this.setState({charged: true})
            setTimeout(() => {
                this.handleClose();
            },8000)
        }).catch(function (error) {
            console.log(error)
        })
    };

    render() {
        const { classes } = this.props;
        let d = new Date();
        console.log(this.state);

        return (<div>

            <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                <Button size="small" color="secondary" variant="outlined">
                Buscar archivo CSV</Button>
            </ReactFileReader>  

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
                    this.handleClick(this.state);
                }}>Predecir opciones</Button>
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
                        </div>:<div>Listo! Puede observar los resultados <Link to="/results" style={{ textDecoration: 'none', color:'yellow' }}>acá</Link></div>
                    }
                />

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