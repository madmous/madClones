import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HeaderUser from '../components/HeaderUser/HeaderUser';

import * as ModalActionCreators from '../modules/modals';
import * as PopOverActionCreators from '../modules/popOver';

const mapStateToProps = (state) => {
  const { fullName } = state.user;

  return {
    fullName 
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
    modalActions: bindActionCreators(ModalActionCreators, dispatch),
    popOverActions: bindActionCreators(PopOverActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderUser);