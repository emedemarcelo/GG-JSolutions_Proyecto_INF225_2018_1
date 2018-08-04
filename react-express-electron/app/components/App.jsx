import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { MailFolderListItems, otherMailFolderListItems } from './NavbarItems.jsx';
import Analysis from './Analysis.jsx';
import Results from './Results.jsx';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
  Link
} from 'react-router-dom'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class App extends React.Component {
  state = {
    open: false,
    n: 1,
    charged: 0,
  };

  cards = [{
    id: 1,
    nombre: "Tarjeta #1"
  }];

  formData = [{}];

  yfData = [];

  addCardData = (data) => { // hacer logica con los GET acá
    this.cards = this.cards.concat([{
      id: this.state.n + 1,
      nombre: "Tarjeta N° " + this.state.n + " desde " + data.dir,
      numericalData: []
    }]);

    console.log(this.cards);

    if (data.from_form === true) {
      this.formData.push(data);
    }

    console.log(data);


    let promesa = new Promise(function (resolve, reject) {
      axios.get('http://localhost:5000/api/test', {
        params: data
      }).then(res => {
        const data = res.data;
        console.log(data.message);
        return resolve("resuelto");
      });
    });

    Promise.resolve(promesa).then(
      this.setState({
        open: this.state.open,
        n: this.state.n + 1,
      })
    );

    let promise_yf = new Promise(function (resolve, reject) {
      axios.get('http://localhost:5000/api/yf', {
        params: data
      }).then(res => {
        const data = res.data;
        console.log("Received data from backend: ");
        console.log(data);
        return resolve(data); // You can pass something to the Promise.resolve function if you want
      })
    });

    Promise.resolve(promise_yf).then((data) => {
      this.yfData.push(data);
      console.log("promise_yf resolved!");
      console.log("Printing yfData: ");
      console.log(this.yfData.pop());
      this.setState({
        open: this.state.open,
        n: this.state.n + 1
      });
    });

  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };



  render() {
    const { classes, theme } = this.props;

    const FadingRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        <Component {...props} />
      )} />
    )

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Valoración de Opciones
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>{MailFolderListItems}</List>
          <Divider />
          <List>{otherMailFolderListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography>
            <FadingRoute path="/analysis" component={() => <Analysis myFunc={this.addCardData} />} />
            <Route exact path="/" render={() => <Home />} />
            <Route path="/results" render={() => <Results cards={this.cards} />} />
          </Typography>
        </main>
      </div>
    );
  }
}

const Home = () => (
  <div>
    <h2>Valoración de Opciones</h2>
    <p>Bienvenido al programa de Valoración de Opciones!</p>
    <p>Por favor, ingrese la información en Formulario o suba un archivo .csv para iniciar la simulación</p>
  </div>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);