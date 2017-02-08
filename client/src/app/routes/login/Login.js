import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { Link } from 'react-router';

import { LoginForm } from './components/index';

import './Login.css';

const propTypes = {
  isAuthenticatingSuccessful: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,

  loginActions: PropTypes.object.isRequired
}

export default class Login extends Component {
  componentWillMount() {
    const { isAuthenticated, dispatch } = this.props;

    if (isAuthenticated) {
      dispatch(push('/'));
    }
  }

  componentDidMount () {
     document.title = 'Login to Trello Clone';
  }

  authenticate = (formInput) => {
    const { loginActions, location } = this.props;

    loginActions.authenticate(formInput, location);
  }

  render () {
    return (
      <div className="Login">
        <LoginForm onSubmit={ this.authenticate } />
        <p>Don't have an account? <Link to={`/signup`}>Create a Trello Clone Account</Link></p>
      </div>
    );
  }
}

Login.propTypes = propTypes;