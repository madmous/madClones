import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import '../Form.css';

const propTypes = {
  isCreateBoardModalOpen: PropTypes.bool.isRequired,

  modalActions: PropTypes.object.isRequired
};

const defaultProps = {
  isCreateBoardModalOpen: false
}

function CreateOrganization(props) {
  const focusOnPopHover = isFocusOnPopHover => {
    
    if (isFocusOnPopHover) {
      props.modalActions.focusOnModal();
    } else {
      props.modalActions.blurOnModal();
    }
  };

	const getClassName = () => {
		if (props.isCreateOrganizationModalOpen) {
			return "Form Form-Shown"
		}

		return "Form Form-Hidden"
	};

	const closeModal = () => {
		props.modalActions.closeCreteOrganizationModal()
	};

	const { handleSubmit } = props;
		
	return (
		<div 
			className={ getClassName() } 
			tabIndex="0" 
			onFocus={() => { focusOnPopHover(true) }}
			onBlur={() => { focusOnPopHover(false) }} 
		>
			<div className="Form-Header">
			<span className="Form-Header-Title">Create Team 
					<FontAwesome 
						name="times" 
						className="Form-Header-Close-Button" 
						onClick={(event) => { closeModal() }} 
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

CreateOrganization.defaultProps = defaultProps;
CreateOrganization.propTypes = propTypes;

export default reduxForm({ form: 'createOrganizationForm' })(CreateOrganization);
