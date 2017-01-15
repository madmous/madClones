import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import './LoginForm.css'

class LoginForm extends Component {

	getErrorMessage() {
		const { errorMessage } = this.props;
		let message = '';

		if (errorMessage.usernameErr) {
			message = errorMessage.usernameErr
		} else if (errorMessage.passwordErr) {
			message = errorMessage.passwordErr;
		}

		if (errorMessage.usernameErr || errorMessage.passwordErr) {
			return (
				<div className="Login-Form-Error">
					<p>{ message }</p>
				</div>
			);
		} else return null;
	}

	getUsernameClass() {
		let usernameClass = "Login-Form-Username";
		
		if (this.props.errorMessage.usernameErr) {
			usernameClass += " Error"; 
		}

		return usernameClass;
	}

	getPasswordClass() {
		let usernameClass = "Login-Form-Password";
		
		if (this.props.errorMessage.passwordErr) {
			usernameClass += " Error"; 
		}

		return usernameClass;
	}
	
  render() {
    const { handleSubmit } = this.props;
		
    return (
			<div className="Login-Form">
				<div className="Login-Form-Header">
					<span className="Login-Form-Header-Title">Log in Trello Clone</span>
				</div>
				{ this.getErrorMessage() }
				<div>
					<form onSubmit={handleSubmit}>
						<div className="Login-Form-Fiels">
							<label htmlFor="username">Name</label>
							<Field
								className= { this.getUsernameClass() }
								autoFocus={true}
								type="text" 
								name="username"
								value="" 
								component="input"
								dir="auto"
							/>
							<label htmlFor="password">Password</label>
							<Field
								className= { this.getPasswordClass() }
								autoFocus={false}
								type="text" 
								name="password"
								value="" 
								component="input"
								dir="auto"
							/>
						</div>
						<button type="submit" className="Login-Form-SubmitButton">Login</button>
					</form>
				</div>
      </div>
    );
  }
}

LoginForm = reduxForm({
  form: 'loginForm' // a unique name for this form
})(LoginForm);

function mapStateToProps(state) {
	const { isAuthenticated } = state.user;
	const { errorMessage } = state.login;

	return {
		isAuthenticated,
		errorMessage
	}
}

export default connect(mapStateToProps)(LoginForm);