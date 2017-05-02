import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import './CreateCardItem.css';

const propTypes = {
  isCreateCardItemFormOpen: PropTypes.bool.isRequired,

  cardActions: PropTypes.object.isRequired
}

function CreateCardItem(props) {
	const handleEnterKey = event => {
		if (event.keyCode === 13) {
			event.preventDefault();
			this.props.handleSubmit();
		}
	}

	const focusOnForm = isFocusOnForm => {
		const { cardActions } = props;
    
    if (isFocusOnForm) {
      cardActions.focusOnCardItemForm();
    } else {
      cardActions.blurOnCardItemForm();
    }
  }

	const { handleSubmit, cardActions } = props;

  return (
		<div 
			className="Create-Card-Item-Form"
			tabIndex="0" 
			onFocus={() => { focusOnForm(true) }}
			onBlur={() => { focusOnForm(false) }} 
		>
			<form onSubmit={ handleSubmit }>
				<Field
					className="Create-Card-Item-Form-Card-Title"
					autoFocus={true}
					type="text" 
					name="name"
					value=""
					component="textarea"
					dir="auto"
					onKeyDown={ handleEnterKey }
				/>
				<div className="Create-Card-Item-Form-Footer">
					<button type="submit" className="Create-Card-Item-Form-SubmitButton">Save</button>
					<FontAwesome 
						name="times"
						size="2x"
						className="Create-Card-Item-Form-Header-Close-Button"
						onClick={ () => cardActions.closeCreateCardItemForm() }
					/>
				</div>
			</form>
		</div>
	);
}

CreateCardItem.propTypes = propTypes;

export default  reduxForm({ form: 'createCardItemForm' })(CreateCardItem);