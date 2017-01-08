import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, push } from 'react-router-redux';

import Home from './routes/home/HomeContainer';
import Login from './routes/login/LoginContainer';
import SignUp from './routes/signUp/SignUpContainer';

import configureStore from './store/configureStore';

import { RequiresAuthentication } from './utils/authentiationWrappers';
import { authenticateIfNeeded } from './routes/login/Login/modules/login';

import './index.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const Authenticated = RequiresAuthentication((props) => props.children);

const isAuthenticatedWithJWT = (nextState, replace) => {
  if (localStorage.getItem('userId')) {
    store.dispatch(authenticateIfNeeded());
    store.dispatch(push('/'));
  }
}

ReactDOM.render(
  <Provider store={store}>
     <Router history={history}>
      <Route path="/login" component={Login} onEnter={isAuthenticatedWithJWT} />
      <Route path="/signup" component={SignUp} onEnter={isAuthenticatedWithJWT} />
      <Route component={Authenticated}>
        <Route path="/" component={Home} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);