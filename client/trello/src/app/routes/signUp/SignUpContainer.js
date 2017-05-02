import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SignUp from './SignUp';

import { signUpActionCreators } from './modules/index'

const mapStateToProps = state => {
  const { isAuthenticatingSuccessful, isAuthenticated } = state.login;

  return {
    isAuthenticatingSuccessful,
    isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    signUpActions: bindActionCreators(signUpActionCreators, dispatch),
    dispatch 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);