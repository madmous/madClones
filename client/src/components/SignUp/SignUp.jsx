import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SignUpForm } from '../../containers/index';
import { signUp } from '../../redux/modules/authentication';

import './SignUp.css';

export default class SignUp extends Component {
  render() {
    return (
      <div className="SignUp">
        <SignUpForm onSubmit={this.signUp} />
      </div>
    );
  }

  signUp = (formInput) => {
    this.props.authenticationActions.signUp(formInput);
  }
}