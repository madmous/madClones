import { syncHistoryWithStore, push } from 'react-router-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import SignUp from './pages/signup/SignUpContainer';
import Boards from './pages/login/LoginContainer';
import Login from './pages/login/LoginContainer';
import Home from './pages/home/HomeContainer';

import configureStore from './store/configureStore';

import { RequiresAuthentication } from './utils/authentiationWrappers';
import { authenticateIfNeeded } from './pages/login/Login/modules/login';

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
      <Route path="/" component={Authenticated}>
        <IndexRoute component={Home} />
        <Route path="/boards/:id" component={Boards} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);