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
//import DataParser from './DataParser.jsx';
import ReactFileReader from 'react-file-reader';
import Papa from 'papaparse';


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
        fileJSON: []
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleFiles = (files) => {
        
        var reader = new FileReader();
        reader.onload = function(e) {
            let data;
            let self = this;
            // Use reader.result
            //alert(reader.result)
            //LO QUE SALE DE DATA PARSER HAY QUE GUARDARLO EN UN ESTADO
            //data = DataParser.loadDataFromFile(reader.result);
            //console.log(data);

        }

        reader.readAsText(files[0]);
        let aux = files[0];
        let CSV_data = [];
        Papa.parse(files[0], {
            complete: function(results) {
                //console.log(results);
                CSV_data=results.data;
            }
        });
        this.setState({
            accion: this.state.accion,
            mercado: this.state.mercado,
            fecha_inicio: this.state.fecha_inicio,
            fecha_termino: this.state.fecha_termino,
            trayectorias: this.state.trayectorias,
            tasa_riesgo: this.state.tasa_riesgo,
            dir: this.state.dir,
            options: this.state.options,
            from_form: this.state.from_form,
            timestamp: this.state.timestamp,
            fileJSON: CSV_data
        });
        

        //console.log(aux.path);
    }

    render() {
        const { classes } = this.props;
        let d = new Date();
        console.log(this.state.fileJSON);
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