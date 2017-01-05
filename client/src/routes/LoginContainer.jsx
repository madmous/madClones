import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import * as authenticationActionCreators from '../redux/modules/authentication'
import { Login } from '../components/index';

class LoginContainer extends Component {
  render() {
    return (
      <Login {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const { isAuthenticatingSuccessful } = state.authentication;

  return {
    isAuthenticatingSuccessful
  };
}

function mapDispatchToProps(dispatch) {
  return { authenticationActions: bindActionCreators(authenticationActionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
