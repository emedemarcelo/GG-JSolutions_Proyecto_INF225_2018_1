import React from 'react';
import ReactDOM from 'react-dom';
import MiniDrawer from './components/navbar.jsx';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    withRouter,
    Link
  } from 'react-router-dom'

class Hello extends React.Component {
    render() {
        return (
            <MiniDrawer />
        )
    }
}


ReactDOM.render(<Router><Hello /></Router>, document.getElementById("appa"));