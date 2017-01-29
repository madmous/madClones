import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import './CreateCardItem.css';

class CreateCardItem extends Component {

	handleEnterKey = (event) => {

		if (event.keyCode === 13) {
			event.preventDefault();
			this.props.handleSubmit();
		}
	}

	focusOnForm(isFocusOnForm) {

		const { cardActions } = this.props;
    
    if (isFocusOnForm) {
      cardActions.focusOnCardItemForm();
    } else {
      cardActions.blurOnCardItemForm();
    }
  }

  render() {
    return (
			<div 
				className="Create-Card-Item-Form"
				tabIndex="0" 
				onFocus={() => { this.focusOnForm(true) }}
				onBlur={() => { this.focusOnForm(false) }} 
			>
				<form onSubmit={ this.props.handleSubmit }>
					<Field
						className="Create-Card-Item-Form-Card-Title"
						autoFocus={true}
						type="text" 
						name="name"
						value=""
						component="textarea"
						dir="auto"
						onKeyDown={ this.handleEnterKey }
					/>
					<div className="Create-Card-Item-Form-Footer">
						<button type="submit" className="Create-Card-Item-Form-SubmitButton">Save</button>
						<FontAwesome 
							name="times"
							size="2x"
							className="Create-Card-Item-Form-Header-Close-Button"
							onClick={ () => this.props.cardActions.closeCreateCardItemForm() }
						/>
					</div>
				</form>
      </div>
    );
  }
}

export default  reduxForm({ form: 'createCardItemForm' })(CreateCardItem);