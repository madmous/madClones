import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { 
  starredBoardActionCreators,
  boardActionCreators 
} from '../../../../modules/index';

import { boardViewActionCreators } from '../../modules/index';

import BoardViewHeader from './BoardViewHeader';

const mapStateToProps = state => {
  const { isFocusOnUpdateBoardNameForm, isUpdateBoardNameOpen } = state.boardView;
  const { starredBoards } = state.starredBoard;
  const { organizations } = state.organization;
  const { boards } = state.board;
  const { userId } = state.app;

  return {
    isFocusOnUpdateBoardNameForm,
    isUpdateBoardNameOpen,
    organizations,
    starredBoards,
    boards,
    userId
  };
}

const mapDispatchToProps = dispatch => {
  return {
    starredBoardActions: bindActionCreators(starredBoardActionCreators, dispatch),
    boardViewActions: bindActionCreators(boardViewActionCreators, dispatch),
    boardActions: bindActionCreators(boardActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardViewHeader);
