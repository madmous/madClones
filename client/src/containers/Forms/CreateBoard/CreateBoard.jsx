import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import { closeCreateBoardModal } from '../../../redux/modules/modals';

import '../Form.css'

const propTypes = {
  isCreateBoardModalOpen: PropTypes.bool.isRequired
}

class CreateBoard extends Component {
  render() {
    const { handleSubmit } = this.props;
		
    return (
			<div className={this.getClassName()}>
				<div className="Form-Header">
					<span className="Form-Header-Title">Create Board 
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
		if (this.props.isCreateBoardModalOpen) {
			return "Form Form-Shown"
		}

		return "Form Form-Hidden"
	}

	closeModal() {
		this.props.dispatch(closeCreateBoardModal())
	}
}

CreateBoard = reduxForm({
  form: 'createBoardForm' // a unique name for this form
})(CreateBoard);

function mapStateToProps(state) {
	const { isCreateBoardModalOpen } = state.modals;

	return {
		isCreateBoardModalOpen
	}
}

CreateBoard.propTypes = propTypes;

export default connect(mapStateToProps)(CreateBoard);

