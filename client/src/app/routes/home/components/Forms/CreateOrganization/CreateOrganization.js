import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import '../Form.css';

const propTypes = {
  isCreateBoardModalOpen: PropTypes.bool.isRequired,

  modalActions: PropTypes.object.isRequired
}

class CreateOrganization extends Component {
  render() {
    const { handleSubmit } = this.props;
		
    return (
			<div 
        className={this.getClassName()} 
        tabIndex="0" 
				onFocus={() => { this.focusOnPopHover(true) }}
				onBlur={() => { this.focusOnPopHover(false) }} 
      >
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

  focusOnPopHover (isFocusOnPopHover) {
    
    if (isFocusOnPopHover) {
      this.props.modalActions.focusOnModal();
    } else {
      this.props.modalActions.blurOnModal();
    }
  }

	getClassName() {
		if (this.props.isCreateOrganizationModalOpen) {
			return "Form Form-Shown"
		}

		return "Form Form-Hidden"
	}

	closeModal() {
		this.props.modalActions.closeCreteOrganizationModal()
	}
}

CreateOrganization.propTypes = propTypes;

export default reduxForm({ form: 'createOrganizationForm' })(CreateOrganization);
