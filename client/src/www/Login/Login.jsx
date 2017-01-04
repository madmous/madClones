import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authenticate } from '../../redux/modules/authentication';

import { LoginForm } from '../../containers/index';

import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <LoginForm onSubmit={this.authenticate} />
      </div>
    );
  }

  authenticate = (formInput) => {
    this.props.dispatch(authenticate(formInput.username, formInput.password));
  }
}

function mapStateToProps(state) {
  const { isAuthenticatingSuccessful } = state.authentication;

  return {
    isAuthenticatingSuccessful
  };
}

export default connect(mapStateToProps)(Login);
