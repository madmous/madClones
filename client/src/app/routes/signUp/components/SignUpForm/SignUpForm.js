import { Field, reduxForm } from 'redux-form';
import React, { Component } from 'react';

import './SignUpForm.css'

class SignUpForm extends Component {
	getUserNameClass() {
		let usernameClass = "SignUp-Form-Username";
		
		if (this.props.errorMessage.missingUsername) {
			usernameClass += " Error"; 
		}

		return usernameClass;
	}

	getUserNameErrorMessage() {
		const { errorMessage } = this.props;

		if (errorMessage.missingUsername) {
			return errorMessage.missingUsername;
		}
	}

	getFullNameClass() {
		let fullNameClass = "SignUp-Form-FullName";
		
		if (this.props.errorMessage.missingFullname) {
			fullNameClass += " Error"; 
		}

		return fullNameClass;
	}

	getFullNameErrorMessage() {
		const { errorMessage } = this.props;

		if (errorMessage.missingFullname) {
			return errorMessage.missingFullname;
		}
	}

	getInitialsClass() {
		let initialsClass = "SignUp-Form-Initials";
		
		if (this.props.errorMessage.missingPassword) {
			initialsClass += " Error"; 
		}

		return initialsClass;
	}

	getInitialsErrorMessage() {
		const { errorMessage } = this.props;

		if (errorMessage.missingInitials) {
			return errorMessage.missingInitials;
		}
	}

	getEmailClass() {
		let emailClass = "SignUp-Form-Email";
		
		if (this.props.errorMessage.missingEmail) {
			emailClass += " Error"; 
		}

		return emailClass;
	}

	getEmailErrorMessage() {
		const { errorMessage } = this.props;

		if (errorMessage.missingEmail) {
			return errorMessage.missingEmail;
		}
	}

	getPasswordClass() {
		let passwordClass = "SignUp-Form-Email";
		
		if (this.props.errorMessage.missingPassword) {
			passwordClass += " Error"; 
		}

		return passwordClass;
	}

	getPasswordErrorMessage() {
		const { errorMessage } = this.props;

		if (errorMessage.missingPassword) {
			return errorMessage.missingPassword;
		}
	}

  render() {
    const { handleSubmit } = this.props;
		
    return (
			<div className="SignUp-Form">
				<div className="SignUp-Form-Header">
					<span className="SignUp-Form-Header-Title">Create a Trello Clone Account</span>
				</div>
				<div>
					<form onSubmit={handleSubmit}>
						<div className="SignUp-Form-Fiels">
							<label htmlFor="username">Name</label>
							<Field
								placeholder={ this.getUserNameErrorMessage() }
								className={ this.getUserNameClass() }
								ref="usernameInput"
								autoFocus
								type="text" 
								name="username"
								value="" 
								component="input"
								dir="auto"
							/>
							<label htmlFor="fullname">Full Name</label>
							<Field
								placeholder={ this.getFullNameErrorMessage()}
								className={ this.getFullNameClass() }
								autoFocus={false}
								type="text" 
								name="fullname"
								value="" 
								component="input"
								dir="auto"
							/>
							<label htmlFor="initials">Initials</label>
							<Field
								placeholder={ this.getInitialsErrorMessage() }
								className={ this.getInitialsClass() }
								autoFocus={false}
								type="text" 
								name="initials"
								value="" 
								component="input"
								dir="auto"
							/>
							<label htmlFor="email">Email</label>
							<Field
								placeholder={ this.getEmailErrorMessage() }
								className={ this.getEmailClass() }
								autoFocus={false}
								type="text" 
								name="email"
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
						<button type="submit" className="SignUp-Form-SubmitButton">Create a New Account</button>
					</form>
				</div>
      </div>
    );
  }
}

export default reduxForm({ form: 'signUpForm' })(SignUpForm);
