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
    </div>
  );
}
