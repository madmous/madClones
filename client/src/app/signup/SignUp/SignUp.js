import { Link } from 'react-router';
import React from 'react';

import { SignUpForm } from './components/index';

import './SignUp.css';

export default function SignUp(props) {
  const signUp = (formInput) => {
    props.signUpActions.createUser(formInput);
  }

  return (
		<div className="SignUp">
			<SignUpForm onSubmit={signUp} />
      <p>Already have an account? <Link to={`/login`}>Log in</Link></p>
		</div>
	);
}