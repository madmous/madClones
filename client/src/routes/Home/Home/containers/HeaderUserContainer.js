import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HeaderUser from '../components/HeaderUser/HeaderUser';

import * as PopOverActionCreators from '../modules/popOver';

const mapStateToProps = (state) => {
  const { fullName } = state.user;

  return {
    fullName 
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
    popOverActions: bindActionCreators(PopOverActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderUser);