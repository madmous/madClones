import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SignUp from './SignUp';

import * as signUpActionCreators from './modules/signUp'

const mapStateToProps = state => {
  const { isAuthenticatingSuccessful } = state.signUp;
  const { isAuthenticated } = state.login;

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