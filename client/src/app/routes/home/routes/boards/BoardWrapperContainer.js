import { connect } from 'react-redux';

import BoardWrapper from './BoardWrapper';

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

export default connect(mapStateToProps)(BoardWrapper);
