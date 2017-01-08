import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import LoginForm from '../components/index'

const mapStateToProps = (state) => {
	const { isAuthenticated } = state.authentication;

	return {
		isAuthenticated
	}
}