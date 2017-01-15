import { Link } from 'react-router';
import React from 'react';

import { LoginForm } from './components/index';

import './Login.css';

export default function Login(props) {
  const authenticate = (formInput) => {
    props.loginActions.authenticate(formInput.username, formInput.password);
  }

  return (
    <div className="Login">
      <LoginForm onSubmit={authenticate} />
      <p>Don't have an account? <Link to={`/signup`}>Create a Trello Clone Account</Link></p>
    </div>
  );
}
