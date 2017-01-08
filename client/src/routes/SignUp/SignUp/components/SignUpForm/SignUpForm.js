import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import './SignUpForm.css'

class SignUpForm extends Component {
  render() {
    const { handleSubmit } = this.props;
		
    return (
			<div className="SignUp-Form">
				<div className="SignUp-Form-Header">
					<span className="SignUp-Form-Header-Title">Create a Trello Account</span>
				</div>
				<div>
					<form onSubmit={handleSubmit}>
						<div className="SignUp-Form-Fiels">
							<label htmlFor="username">Name</label>
							<Field
								className="SignUp-Form-Username"
								autoFocus={true}
								type="text" 
								name="username"
								value="" 
								component="input"
								dir="auto"
							/>
							<label htmlFor="fullname">Full Name</label>
							<Field
								className="SignUp-Form-FullName"
								autoFocus={true}
								type="text" 
								name="fullname"
								value="" 
								component="input"
								dir="auto"
							/>
							<label htmlFor="initials">Initials</label>
							<Field
								className="SignUp-Form-Initials"
								autoFocus={true}
								type="text" 
								name="initials"
								value="" 
								component="input"
								dir="auto"
							/>
							<label htmlFor="email">Email</label>
							<Field
								className="SignUp-Form-Email"
								autoFocus={true}
								type="text" 
								name="email"
								value="" 
								component="input"
								dir="auto"
							/>
							<label htmlFor="password">Password</label>
							<Field
								className="SignUp-Form-Password"
								autoFocus={true}
								type="text" 
								name="password"
								value="" 
								component="input"
								dir="auto"
							/>
						</div>
						<button type="submit" className="SignUp-Form-SubmitButton">Create a New Account</button>
					</form>
				</div>
      </div>
    );
  }
}

SignUpForm = reduxForm({
  form: 'signUpForm' // a unique name for this form
})(SignUpForm);

function mapStateToProps(state) {
	const { isAuthenticated } = state.signUp;

	return {
		isAuthenticated
	}
}

export default connect(mapStateToProps)(SignUpForm);

