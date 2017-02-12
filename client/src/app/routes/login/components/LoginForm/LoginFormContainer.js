import { connect } from 'react-redux';

import LoginForm from './LoginForm';

function mapStateToProps(state) {
	const { errorMessage } = state.login;

	return {
		errorMessage
	}
}

export default connect(mapStateToProps)(LoginForm);