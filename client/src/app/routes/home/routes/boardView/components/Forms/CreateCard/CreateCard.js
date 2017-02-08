import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import './CreateCard.css';

const propTypes = {
  isCreateCardFormOpen: PropTypes.bool.isRequired,

  boardViewActions: PropTypes.object.isRequired
}

function CreateCard(props) {
	const focusOnForm = isFocusOnForm => {
    if (isFocusOnForm) {
      props.boardViewActions.focusOnBoard();
    } else {
      props.boardViewActions.blurOnBoard();
    }
  }

	const { boardViewActions, handleSubmit } = props;

	return (
		<div 
			className="Create-Card-Form"
			tabIndex="0" 
			onFocus={() => { focusOnForm(true) }}
			onBlur={() => { focusOnForm(false) }} 
		>
			<form onSubmit={ handleSubmit }>
				<Field
					className="Create-Card-Form-CardTitle"
					autoFocus={true}
					type="text" 
					name="name"
					value="" 
					placeholder="Add a card…" 
					component="input"
					dir="auto"
				/>
				<div className="Create-Card-Form-Footer">
					<button type="submit" className="Create-Card-Form-SubmitButton">Save</button>
					<FontAwesome 
						name="times"
						size="2x"
						className="Create-Card-Form-Header-Close-Button"
						onClick={ () => boardViewActions.closeCreateCardForm() }
					/>
				</div>
			</form>
		</div>
	);
}

CreateCard.propTypes = propTypes;

export default reduxForm({ form: 'createCardForm' })(CreateCard);
