import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import './LoginForm.css'

class LoginForm extends Component {
  render() {
    const { handleSubmit } = this.props;
		
    return (
			<div className="Login-Form">
				<div className="Login-Form-Header">
					<span className="Login-Form-Header-Title">Log in Trello</span>
				</div>
				<div>
					<form onSubmit={handleSubmit}>
						<div className="Login-Form-Fiels">
							<label htmlFor="username">Name</label>
							<Field
								className="Login-Form-Username"
								autoFocus={true}
								type="text" 
								name="username"
								value="" 
								component="input"
								dir="auto"
							/>
							<label htmlFor="password">Password</label>
							<Field
								className="Login-Form-Password"
								autoFocus={true}
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
	const { isAuthenticated } = state.authentication;

	return {
		isAuthenticated
	}
}

export default connect(mapStateToProps)(LoginForm);

