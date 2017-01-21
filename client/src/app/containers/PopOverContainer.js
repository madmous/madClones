import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as popOverActionCreators from '../modules/popOver';
import * as loginActionCreators from '../routes/login/modules/login';

import PopOver from '../components/PopOver/PopOver';

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