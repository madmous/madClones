import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SignUp from './SignUp';

import * as signUpActionCreators from './modules/signUp'

const mapStateToProps = state => {
  const { isAuthenticatingSuccessful } = state.signUp;

  return {
    isAuthenticatingSuccessful
  };
}

const mapDispatchToProps = dispatch => {
  return { signUpActions: bindActionCreators(signUpActionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);