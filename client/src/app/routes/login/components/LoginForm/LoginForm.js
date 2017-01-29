import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import './LoginForm.css'

class LoginForm extends Component {

	getUsernameClass() {
		let usernameClass = "Login-Form-Username";
		
		if (this.props.errorMessage.usernameErr) {
			usernameClass += " Error"; 
		}

		return usernameClass;
	}

	getUserNameErrorMessage() {
		const { errorMessage } = this.props;

		if (errorMessage.usernameErr) {
			return errorMessage.usernameErr;
		}
	}

	getPasswordClass() {
		let usernameClass = "Login-Form-Password";
		
		if (this.props.errorMessage.passwordErr) {
			usernameClass += " Error"; 
		}

		return usernameClass;
	}

	getPasswordErrorMessage() {
		const { errorMessage } = this.props;

		if (errorMessage.passwordErr) {
			return errorMessage.passwordErr;
		}
	}
	
  render() {
    const { handleSubmit } = this.props;
		
    return (
			<div className="Login-Form">
				<div className="Login-Form-Header">
					<span className="Login-Form-Header-Title">Log in Trello Clone</span>
				</div>
				<div>
					<form onSubmit={handleSubmit}>
						<div className="Login-Form-Fiels">
							<label htmlFor="username">Name</label>
							<Field
								placeholder={ this.getUserNameErrorMessage() }
								className={ this.getUsernameClass() }
								autoFocus={true}
								type="text" 
								name="username"
								value="" 
								component="input"
								dir="auto"
							/>
							<label htmlFor="password">Password</label>
							<Field
								placeholder={ this.getPasswordErrorMessage() }
								className={ this.getPasswordClass() }
								autoFocus={false}
								type="password" 
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

export default reduxForm({ form: 'loginForm' })(LoginForm);