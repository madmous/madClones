import { connect } from 'react-redux';

import SignUpForm from './SignUpForm';

function mapStateToProps(state) {
	const { errorMessage } = state.signUp;

	return {
		errorMessage
	}
}

export default connect(mapStateToProps)(SignUpForm);