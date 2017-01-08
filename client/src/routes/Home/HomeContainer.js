import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import Home from './Home/Home'

import * as userActionCreators from './Home/modules/user';

const mapStateToProps = (state) => {
  const { fullName } = state.user;
  const { isAuthenticated } = state.login;
  const { errorMessages } = state.notification;

  return {
    isAuthenticated,
    errorMessages,
    fullName
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
    userActions: bindActionCreators(userActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
