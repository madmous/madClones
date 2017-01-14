import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PopOver from '../components/PopOver/PopOver';

import * as PopOverActionCreators from '../modules/popOver';
import * as LoginActionCreators from '../../../Login/Login/modules/login';

const mapStateToProps = (state) => {
  const { fullName } = state.user;

  return {
    fullName 
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
    loginActions: bindActionCreators(LoginActionCreators, dispatch),
    popOverActions: bindActionCreators(PopOverActionCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopOver);