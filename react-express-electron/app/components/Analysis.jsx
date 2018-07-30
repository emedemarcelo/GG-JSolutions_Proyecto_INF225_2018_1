import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import NetworkIcon from '@material-ui/icons/Language';
import PCIcon from '@material-ui/icons/Input';
import './AnimatedSwitchDemo.css';
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
                            <BottomNavigationAction label="Desde su equipo" icon={<PCIcon />} onClick={() => this.props.myFunc({
                                dir : "equipo"
                            })}/>
                        </BottomNavigation>

                        <FormularioC ></FormularioC>
                    </center>
                </div>
            );
    }
}

SimpleBottomNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
    myFunc: PropTypes.func
};

export default withStyles(styles)(SimpleBottomNavigation);