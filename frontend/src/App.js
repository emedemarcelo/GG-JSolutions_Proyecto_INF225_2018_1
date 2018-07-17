import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { mailFolderListItems, otherMailFolderListItems } from './tileData.jsx';
import Analysis from './Analysis.jsx';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

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
    //flexGrow: 1,
    height: 'relative',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

const App = withRouter(({ classes }, asd) => (
  <div className={classes.root}>
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar>
        <Typography variant="title" color="inherit" noWrap>
          Market Analyzer {console.log(classes)}
    </Typography>
      </Toolbar>
    </AppBar>
    <Drawer variant="permanent" classes={{ paper: classes.drawerPaper, }}>
      <div className={classes.toolbar} />
      <List>{mailFolderListItems}</List>
    </Drawer>
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Typography noWrap>
          <TransitionGroup>
            <CSSTransition
              key={classes.key}
              classNames='fade'
              timeout={1000}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/analysis" component={Analysis} />
                <Route path="/results" component={Results} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
      </Typography>
    </main>
  </div>
))


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)


const Results = () => (
  <div>
    <h2>Results</h2>
  </div>
)

App.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(App);