import { connect } from 'react-redux';

import LoginForm from './LoginForm';

const mapStateToProps = (state) => {
	const { isAuthenticated } = state.user;
	const { errorMessage } = state.login;

	return {
		isAuthenticated,
		errorMessage
	}
}

export default connect(mapStateToProps)(LoginForm);