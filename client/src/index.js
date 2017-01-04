import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Home from './www/Home/Home';
import Login from './www/Login/Login';
import SignUp from './www/SignUp/SignUp';

import requiresAuth from './hocs/requiresAuth'

import configureStore from './redux/configureStore'

import './index.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
     <Router history={history}>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/" component={requiresAuth(Home)} />
    </Router>
  </Provider>,
  document.getElementById('root')
);