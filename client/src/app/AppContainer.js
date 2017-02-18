import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import App from './App';

import { modalActionCreators } from './routes/home/modules/index';

import {
  boardsMenuActionCreators,
  popOverActionCreators,
  appActionCreators
} from './modules/index';

const mapStateToProps = state => {
  const { isFocusOnBoardsMenu, isBoardsMenuOpen } = state.boardsMenu;
  const { isFocusOnPopHover, isPopOverOpen } = state.popOver;
  const { isFocusOnModal, isModalOpen } = state.modals;
  const { isAuthenticated } = state.login;
  const { errorMessages } = state.notification;
  const { fullName } = state.app;

  return {
    isFocusOnBoardsMenu,
    isBoardsMenuOpen,

    isFocusOnPopHover,
    isPopOverOpen,

    isFocusOnModal,
    isModalOpen,

    isAuthenticated,
    errorMessages,
    fullName
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    boardsMenuActions: bindActionCreators(boardsMenuActionCreators, dispatch),
    popOverActions: bindActionCreators(popOverActionCreators, dispatch),
    modalActions: bindActionCreators(modalActionCreators, dispatch),
    appActions: bindActionCreators(appActionCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);