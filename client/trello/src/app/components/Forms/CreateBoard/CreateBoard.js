import { Field, reduxForm } from 'redux-form';
import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import '../Form.css';

const propTypes = {
  isCreateBoardModalOpen: PropTypes.bool,

  modalActions: PropTypes.object.isRequired
};

const defaultProps = {
  isCreateBoardModalOpen: false
};

function CreateBoard(props) {
	const focusOnPopHover = isFocusOnPopHover => {
    
    if (isFocusOnPopHover) {
			props.modalActions.focusOnModal();
    } else {
      props.modalActions.blurOnModal();
    }
  };

	const getClassName = () => {
		if (props.isCreateBoardModalOpen) {
			return "Form Form-Shown";
		}

		return "Form Form-Hidden";
	};

	const closeModal = () => {
		props.modalActions.closeCreateBoardModal()
	};

	const { handleSubmit } = props;
		
	return (
		<div 
			className={ getClassName() } 
			tabIndex="0" 
			onFocus={() => { focusOnPopHover(true) }}
			onBlur={() => { focusOnPopHover(false) }} 
		>
			<div className="Form-Header" >
				<span className="Form-Header-Title">Create Board 
					<FontAwesome 
						name="times" 
						className="Form-Header-Close-Button" 
						onClick={(event) => { closeModal() }} 
					/>
				</span>
			</div>
			<div>
				<form onSubmit={ handleSubmit }>
					<div>
						<label htmlFor="boardNewTitle">Title</label>
						<Field 
							className="Form-BoardTitle"
							type="text" 
							autoFocus={true}
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

CreateBoard.defaultProps = defaultProps;
CreateBoard.propTypes = propTypes;

export default reduxForm({ form: 'createBoardForm' })(CreateBoard);
