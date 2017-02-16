import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import App from './App';

import { 
  modalActionCreators, 
  boardActionCreators 
} from './routes/home/modules/index';

import {
  popOverActionCreators,
  appActionCreators, 
} from './modules/index';

const mapStateToProps = state => {
  const { isBoardsMenuOpen } = state.board;
  const { isFocusOnPopHover, isPopOverOpen } = state.popOver;
  const { isFocusOnModal, isModalOpen } = state.modals;
  const { isAuthenticated } = state.login;
  const { errorMessages } = state.notification;
  const { fullName } = state.app;

  return {
    isFocusOnPopHover,
    isBoardsMenuOpen,
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
    boardActions: bindActionCreators(boardActionCreators, dispatch),
    appActions: bindActionCreators(appActionCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
