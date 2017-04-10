import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { starredBoardActionCreators } from '../../../../modules/index';

import BoardViewHeader from './BoardViewHeader';

const mapStateToProps = state => {
  const { starredBoards } = state.starredBoard;
  const { organizations } = state.organization;
  const { boards } = state.board;
  const { userId } = state.app;

  return {
    organizations,
    starredBoards,
    boards,
    userId
  };
}

const mapDispatchToProps = dispatch => {
  return {
    starredBoardActions: bindActionCreators(starredBoardActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardViewHeader);
