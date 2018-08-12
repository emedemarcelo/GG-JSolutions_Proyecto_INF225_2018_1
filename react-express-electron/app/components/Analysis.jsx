import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import NetworkIcon from '@material-ui/icons/Language';
import PCIcon from '@material-ui/icons/Input';
import './AnimatedSwitchDemo.css';
import FormularioC from './FormularioContainer.jsx';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Formulario from './Formulario.jsx';
import Typography from '@material-ui/core/Typography';
import FormularioLocal from './FormularioLocal.jsx'

import {
    BrowserRouter as Router,
    Route,
    Switch,
    withRouter,
    Link
} from 'react-router-dom'

const styles = {
    root: {
        width: 'relative',
    },
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

class Analysis extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    formData = [];

    retrieveForm = (data) => {
        this.formData = [];
        this.formData.push(data);
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        const renderValue = this.state.value;

        return (
            <div>
                <center>
                    <BottomNavigation
                        value={value}
                        onChange={this.handleChange}
                        showLabels
                        className={classes.root}
                    >
                        <BottomNavigationAction label="Desde Internet" icon={<NetworkIcon />} />
                        <BottomNavigationAction label="Desde su equipo" icon={<PCIcon />} />
                    </BottomNavigation>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary">
                                Análisis de Información
                    </Typography>
                            <Typography variant="headline" component="h2">
                                Consulta de Datos
                    </Typography>
                            <Typography component="p">
                            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                                { renderValue == 0 ? <Formulario />:<FormularioLocal />}
                                </Slide>
                            </Typography>
                        </CardContent>
                    </Card>
                </center>
            </div>
        );
    }
}

Analysis.propTypes = {
    classes: PropTypes.object.isRequired,
    myFunc: PropTypes.func,
};

export default withStyles(styles)(Analysis);