import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import NetworkIcon from '@material-ui/icons/Language';
import PCIcon from '@material-ui/icons/Input';
import Fade from '@material-ui/core/Fade';
import './AnimatedSwitchDemo.css';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormularioC from './FormularioContainer.jsx';


const styles = {
    root: {
        width: 'relative',
    },
};

class SimpleBottomNavigation extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

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

                        <FormularioC></FormularioC>
                    </center>
                </div>
            );
    }
}

SimpleBottomNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);