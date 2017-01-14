import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import Home from './Home/Home'

import * as userActionCreators from './Home/modules/user';

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.login;
  const { displayPopOver } = state.popOver;
  const { errorMessages } = state.notification;
  const { fullName } = state.user;

  return {
    isAuthenticated,
    displayPopOver,
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
