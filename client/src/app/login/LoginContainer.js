import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Login from './Login/Login';

import * as loginActionCreators from './Login/modules/login';

const mapStateToProps = (state) => {
  const { isAuthenticatingSuccessful } = state.login;

  return {
    isAuthenticatingSuccessful
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginActions: bindActionCreators(loginActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
