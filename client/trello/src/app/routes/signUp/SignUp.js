import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { Link } from 'react-router';

import { SignUpForm } from './components/index';

import './SignUp.css';

const propTypes = {
  isAuthenticatingSuccessful: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,

  signUpActions: PropTypes.object.isRequired
}

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
  }

  componentWillMount() {
    const { isAuthenticated, dispatch, location } = this.props;

    if (isAuthenticated) {
      if (location && location.query && location.query.redirect) {
        dispatch(push(location.query.redirect));
      } else {
        dispatch(push('/'));
      }
    }
  }

  componentDidMount () {
     document.title = 'Create a Trello Clone Accout';
  }

  signUp(formInput) {
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

SignUp.propTypes = propTypes;