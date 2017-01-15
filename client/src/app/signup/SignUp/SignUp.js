import { Link } from 'react-router';
import React, { Component } from 'react';

import { SignUpForm } from './components/index';

import './SignUp.css';

export default class SignUp extends Component {

  componentDidMount () {
     document.title = 'Create a Trello Clone Accout';
  }

  signUp = (formInput) => {
    this.props.signUpActions.createUser(formInput);
  }

  render() {
    return (
      <div className="SignUp">
        <SignUpForm onSubmit={ this.signUp } />
        <p>Already have an account? <Link to={`/login`}>Log in</Link></p>
      </div>
    );
  }
}