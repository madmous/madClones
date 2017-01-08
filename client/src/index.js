import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import HomeContainer from './routes/Home/HomeContainer';
import LoginContainer from './routes/Login/LoginContainer';
import SignUpContainer from './routes/SignUp/SignUpContainer';

import requiresAuth from './shared/components/requiresAuth/requiresAuth'

import configureStore from './store/configureStore'

import './index.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
     <Router history={history}>
      <Route path="/login" component={LoginContainer} />
      <Route path="/signup" component={SignUpContainer} />
      <Route path="/" component={HomeContainer} />
    </Router>
  </Provider>,
  document.getElementById('root')
);