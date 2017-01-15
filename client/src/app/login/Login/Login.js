import { Link } from 'react-router';
import React, { Component } from 'react';

import { LoginForm } from './components/index';

import './Login.css';

export default class Login extends Component {

  componentDidMount () {
     document.title = 'Login to Trello Clone';
  }

  authenticate = (formInput) => {
    this.props.loginActions.authenticate(formInput.username, formInput.password);
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
