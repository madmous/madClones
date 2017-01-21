import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Home from './Home';

import {
  modalActionCreators,
  userActionCreators
} from './modules/index';

import { popOverActionCreators } from '../../modules/index';

const mapStateToProps = state => {
  const { isFocusOnPopHover } = state.popOver;
  const { isAuthenticated } = state.login;
  const { isFocusOnModal } = state.modals;
  const { isPopOverOpen } = state.popOver;
  const { errorMessages } = state.notification;
  const { isModalOpen } = state.modals;
  const { fullName } = state.user;

  return {
    isFocusOnPopHover,
    isAuthenticated,
    isFocusOnModal,
    isPopOverOpen,
    errorMessages,
    isModalOpen,
    fullName
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    popOverActions: bindActionCreators(popOverActionCreators, dispatch),
    modalActions: bindActionCreators(modalActionCreators, dispatch),
    userActions: bindActionCreators(userActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
