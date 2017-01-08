import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Home from './routes/Home/HomeContainer';
import Login from './routes/Login/LoginContainer';
import SignUp from './routes/SignUp/SignUpContainer';

import requiresAuth from './shared/components/requiresAuth/requiresAuth'

import configureStore from './store/configureStore'

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