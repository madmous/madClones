import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SignUp from './SignUp/SignUp';

import * as signUpActionCreators from './SignUp/modules/signUp'

const mapStateToProps = (state) => {
  const { isAuthenticatingSuccessful } = state.signUp;

  return {
    isAuthenticatingSuccessful
  };
}

const mapDispatchToProps = (dispatch) => {
  return { signUpActions: bindActionCreators(signUpActionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);