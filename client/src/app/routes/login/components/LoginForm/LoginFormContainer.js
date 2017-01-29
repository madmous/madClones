import { connect } from 'react-redux';

import LoginForm from './LoginForm';

function mapStateToProps(state) {
	const { isAuthenticated } = state.app;
	const { errorMessage } = state.login;

	return {
		isAuthenticated,
		errorMessage
	}
}

export default connect(mapStateToProps)(LoginForm);