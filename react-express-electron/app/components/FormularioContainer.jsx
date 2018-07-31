import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Formulario from './Formulario.jsx';

const styles = {
    card: {
        minWidth: 275
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class SimpleCard extends React.Component {

    formData = [];

    retrieveForm = (data) => {
        this.formData = [];
        this.formData.push(data);
    };

    render(){
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;

        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            Análisis de Información
                        </Typography>
                        <Typography variant="headline" component="h2">
                            Consulta de Datos
                        </Typography>
                        <Typography component="p">
                            <Formulario retrieveForm={this.retrieveForm}></Formulario>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="secondary" variant="outlined" onClick={() => {
                            this.props.myFunc(this.formData.pop())
                        }}>Predecir Opciones</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
    myFunc: PropTypes.func,
};

export default withStyles(styles)(SimpleCard);