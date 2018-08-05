import React from 'react';
import ResultsItem from './ResultsItem.jsx';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
  });

  
class Results extends React.Component {
    componentWillReceiveProps(nextProps){
        // this check makes sure that the getDashboardStats action is not getting called for other prop changes
   }

    render(){
        const items = this.props.value;
        const { classes } = this.props;
        return(<div>
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper className={classes.root} elevation={1}>
              <Typography variant="headline" component="h3">
                  Resultados de Opciones
              </Typography>
              <Typography component="p">
              Por favor, elija alguna acción procesada para ver detalles.
              </Typography>
            </Paper>
            </Slide>
            {items.map((item) => (
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <ResultsItem accion={item.accion} fechaInicio={item.fecha_inicio} 
                fechaTermino={item.fecha_termino} trayectorias={item.trayectorias}
                tasaRiesgo={item.tasa_riesgo} opciones={item.options} fechaSolicitud={item.timestamp} disabled={true}/>
                </Slide>
            ))}
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
        add: (data_in) =>
            dispatch({
                type: 'ADD',
            })
    }
}
export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Results);