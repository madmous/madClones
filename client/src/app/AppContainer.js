import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import App from './App';

import { modalActionCreators } from './routes/home/modules/index';

import { 
  popOverActionCreators,
  appActionCreators, 
} from './modules/index';

const mapStateToProps = state => {
  const { isFocusOnPopHover } = state.popOver;
  const { isAuthenticated } = state.login;
  const { isFocusOnModal } = state.modals;
  const { isPopOverOpen } = state.popOver;
  const { errorMessages } = state.notification;
  const { isModalOpen } = state.modals;
  const { fullName } = state.app;

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
    appActions: bindActionCreators(appActionCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
