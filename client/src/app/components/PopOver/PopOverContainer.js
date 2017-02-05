import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { popOverActionCreators } from '../../modules/index';
import { loginActionCreators } from '../../routes/login/modules/index';

import PopOver from './PopOver';

const mapStateToProps = state => {
  const { fullName } = state.app;

  return {
    fullName 
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    loginActions: bindActionCreators(loginActionCreators, dispatch),
    popOverActions: bindActionCreators(popOverActionCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopOver);