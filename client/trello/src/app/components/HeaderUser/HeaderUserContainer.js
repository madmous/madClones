import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { popOverActionCreators } from '../../modules/index';
import { modalActionCreators } from '../../routes/home/modules/index';

import HeaderUser from './HeaderUser';

const mapStateToProps = state => {
  const { fullName } = state.app;

  return {
    fullName
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    popOverActions: bindActionCreators(popOverActionCreators, dispatch),
    modalActions: bindActionCreators(modalActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderUser);