import React, { Component } from 'react';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

import { LoginForm } from './components/index';

import './Login.css';

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
