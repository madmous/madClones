import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BoardItem from '../components/BoardItem/BoardItem';

import {
  starredBoardActionCreators,
	modalActionCreators,
	boardActionCreators,
} from '../modules/index.js';

import { popOverActionCreators } from '../../../modules/index';

const mapStateToProps = state => {
  const { userId } = state.app;

  return {
    userId
  };
}

const mapDispatchToProps = dispatch => {
  return {
    starredBoardActions: bindActionCreators(starredBoardActionCreators, dispatch),
    popOverActions: bindActionCreators(popOverActionCreators, dispatch),
    modalActions: bindActionCreators(modalActionCreators, dispatch),
    boardActions: bindActionCreators(boardActionCreators, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardItem);