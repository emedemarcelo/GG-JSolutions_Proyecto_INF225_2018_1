import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function Home(props) {
  const { classes } = props;
    console.log("Home rendered");
  return (
    <div>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">
            Bienvenido al programa de Valoración de Opciones!
        </Typography>
        <Typography component="p">
        Por favor, ingrese la información en Formulario o suba un archivo .csv para iniciar la simulación
        </Typography>
      </Paper>
      </Slide>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);