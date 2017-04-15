import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import './UpdateBoardName.css';

const propTypes = {
  isUpdateBoardNameOpen: PropTypes.bool.isRequired,

  boardViewActions: PropTypes.object.isRequired
};

function UpdateBoardName(props) {
  const focusOnForm = isFocusOnPopHover => {
    
    if (isFocusOnPopHover) {
      props.boardViewActions.focusOnUpdateBoardNameForm();
    } else {
      props.boardViewActions.blurOnUpdateBoardNameForm();
    }
  };

	const closeForm = () => {
		props.boardViewActions.closeUpdateBoardNameForm();
	};

	const { handleSubmit } = props;
		
	return (
		<div 
			className="Form Update-Board-Name-Form" 
			tabIndex="0" 
			onFocus={() => { focusOnForm(true) }}
			onBlur={() => { focusOnForm(false) }} 
		>
			<div className="Form-Header">
				<span className="Form-Header-Title">Rename Board
					<FontAwesome 
						name="times" 
						className="Form-Header-Close-Button" 
						onClick={(event) => { closeForm() }} 
					/>
				</span>
			</div>
			<div>
				<form onSubmit={ handleSubmit }>
					<div>
						<label htmlFor="boardNewTitle">Name</label>
						<Field
							className="Form-BoardTitle"
							autoFocus={true}
							type="text" 
							name="boardName"
							value=""
							component="input"
							dir="auto"
						/>
					</div>
					<button type="submit" className="Form-SubmitButton">Rename</button>
				</form>
			</div>
		</div>
	);
}

UpdateBoardName.propTypes = propTypes;

export default reduxForm({ form: 'updateBoardNameForm' })(UpdateBoardName);
