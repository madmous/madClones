import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';


import { closeModal } from '../../redux/modules/board';

import './Form.css'

class ContactForm extends Component {
  render() {
    const { handleSubmit } = this.props;
		
    return (
			<div className={this.getClassName()}>
				<div className="Form-Header">
					<span className="Form-Header-Title">Create Board</span>
					<a href="#" className="Form-Header-Close" onClick={(event) => { this.closeModal() }}></a>
				</div>
				<div>
					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor="boardNewTitle">Title</label>
							<Field 
								className="Form-BoardTitle"
								type="text" 
								name="name" 
								placeholder="Like “School Research” for example…" 
								value="" 
								component="input"
								dir="auto"
							/>
						</div>
						<button type="submit" className="Form-SubmitButton">Create</button>
					</form>
				</div>
      </div>
    );
  }

	getClassName() {
		if (this.props.isModalOpen) {
			return "Form Form-Shown"
		}

		return "Form Form-Hidden"
	}

	closeModal() {
		this.props.dispatch(closeModal({isModalOpen: false}))
	}
}

ContactForm = reduxForm({
  form: 'contact' // a unique name for this form
})(ContactForm);

function mapStateToProps(state) {
	const { isModalOpen } = state.board;

	return {
		isModalOpen
	}
}

export default connect(mapStateToProps)(ContactForm);

