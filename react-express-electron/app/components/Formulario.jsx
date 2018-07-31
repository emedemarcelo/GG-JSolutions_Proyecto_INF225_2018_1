import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

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
class TextFields extends React.Component {
  state = {
      accion: '',
      mercado: '',
      fecha_inicio: '',
      fecha_termino: '',
      trayectorias: '1',
      tasa_riesgo: '0.000',
      dir: "formulario",
      from_form: true
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  render() {
    const { classes } = this.props;

    this.props.retrieveForm(this.state);

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
      </form>
    );
  }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
    retrieveForm: PropTypes.func
};

export default withStyles(styles)(TextFields);