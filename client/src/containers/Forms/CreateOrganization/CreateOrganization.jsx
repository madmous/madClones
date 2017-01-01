import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import { closeCreteOrganizationModal } from '../../../redux/modules/modals';

import '../Form.css'

class CreateOrganization extends Component {
  render() {
    const { handleSubmit } = this.props;
		
    return (
			<div className={this.getClassName()}>
				<div className="Form-Header">
				<span className="Form-Header-Title">Create Team 
						<FontAwesome 
							name="times" 
							className="Form-Header-Close-Button" 
							onClick={(event) => { this.closeModal() }} 
						/>
					</span>
				</div>
				<div>
					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor="boardNewTitle">Name</label>
							<Field
								className="Form-BoardTitle"
								autoFocus={true}
								type="text" 
								name="name"
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
		if (this.props.isCreateOrganizationModalOpen) {
			return "Form Form-Shown"
		}

		return "Form Form-Hidden"
	}

	closeModal() {
		this.props.dispatch(closeCreteOrganizationModal())
	}
}

CreateOrganization = reduxForm({
  form: 'createOrganizationForm' // a unique name for this form
})(CreateOrganization);

function mapStateToProps(state) {
	const { isCreateOrganizationModalOpen } = state.modals;

	return {
		isCreateOrganizationModalOpen
	}
}

export default connect(mapStateToProps)(CreateOrganization);

