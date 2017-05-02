import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Login from './Login';

import { loginActionCreators } from './modules/index';

const mapStateToProps = state => {
  const { isAuthenticatingSuccessful, isAuthenticated } = state.login;

  return {
    isAuthenticatingSuccessful,
    isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    loginActions: bindActionCreators(loginActionCreators, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
