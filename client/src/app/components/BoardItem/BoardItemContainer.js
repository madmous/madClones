import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BoardItem from './BoardItem';

import {
  starredBoardActionCreators,
	modalActionCreators,
	boardActionCreators,
} from '../../routes/home/modules/index.js';

import { boardsMenuActionCreators } from '../../modules/index'

import { popOverActionCreators } from '../../modules/index';

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
    boardsMenu: bindActionCreators(boardsMenuActionCreators, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardItem);