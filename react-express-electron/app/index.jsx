import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import counter from './components/reducers'
import createBrowserHistory from 'history/createBrowserHistory'

const store = createStore(counter);

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
  Link
} from 'react-router-dom'



class AppFrame extends React.Component {
  render() {
    const customHistory = createBrowserHistory()

    return (
      <Provider store={store}>
        <Router history={customHistory}>
          <App />
        </Router>
      </Provider>
    );
  }
}
ReactDOM.render(<AppFrame />, document.getElementById("app"));