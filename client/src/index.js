import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import HomeContainer from './routes/HomeContainer';
import LoginContainer from './routes/LoginContainer';
import SignUpContainer from './routes/SignUpContainer';

import requiresAuth from './hocs/requiresAuth'

import configureStore from './redux/configureStore'

import './index.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
     <Router history={history}>
      <Route path="/login" component={LoginContainer} />
      <Route path="/signup" component={SignUpContainer} />
      <Route path="/" component={requiresAuth(HomeContainer)} />
    </Router>
  </Provider>,
  document.getElementById('root')
);