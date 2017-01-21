import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Login from './Login';

import * as loginActionCreators from './modules/login';

const mapStateToProps = state => {
  const { isAuthenticatingSuccessful } = state.login;
  const { isAuthenticated } = state.login;

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
