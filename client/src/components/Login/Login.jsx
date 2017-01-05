import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authenticate } from '../../redux/modules/authentication';

import { LoginForm } from '../../containers/index';

import './Login.css';

export default class Login extends Component {
  render() {
    return (
      <div className="Login">
        <LoginForm onSubmit={this.authenticate} />
      </div>
    );
  }

  authenticate = (formInput) => {
    this.props.authenticationActions.authenticate(formInput.username, formInput.password);
  }
}
