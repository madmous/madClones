import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SignUpForm } from '../../containers/index';
import { signUp } from '../../redux/modules/authentication';

import './SignUp.css';

class SignUp extends Component {
  render() {
    return (
      <div className="SignUp">
        <SignUpForm onSubmit={this.signUp} />
      </div>
    );
  }

  signUp = (formInput) => {
    this.props.dispatch(signUp(formInput));
  }
}

function mapStateToProps(state) {
  const { isAuthenticatingSuccessful } = state.authentication;

  return {
    isAuthenticatingSuccessful
  };
}

export default connect(mapStateToProps)(SignUp);