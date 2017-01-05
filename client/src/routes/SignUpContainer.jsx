import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authenticationActionCreators from '../redux/modules/authentication'
import { SignUp } from '../components/index';

class SignUpContainer extends Component {
  render() {
    return (
      <SignUp {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);