import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Boards from '../components/Boards/Boards';

import {
  organizationActionCreators,
	modalActionCreators,
	boardActionCreators,
} from '../modules/index.js';

import { popOverActionCreators } from '../../../modules/index';

const mapStateToProps = state => {
  const { userId } = state.app;

  const { starredBoards } = state.starredBoard;
  const { organizations } = state.organization;
  const { boards } = state.board;

  const { isFetchingUserSuccessful } = state.app;
  const { isFetchingUser } = state.app;

  return {
    userId, 

    starredBoards,
    organizations,
    boards,

    isFetchingUserSuccessful,
    isFetchingUser
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    organizationActions: bindActionCreators(organizationActionCreators, dispatch),
    popOverActions: bindActionCreators(popOverActionCreators, dispatch),
    boardActions: bindActionCreators(boardActionCreators, dispatch),
    modalActions: bindActionCreators(modalActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Boards);