import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Boards from '../components/Boards/Boards';

import * as boardActionCreators from '../modules/board';
import * as modalsActionCreators from '../modules/modals';
import * as popOverActionCreators from '../modules/popOver';
import * as organizationActionCreators from '../modules/organization';

const mapStateToProps = (state) => {
  const { userId } = state.user;

  const { starredBoards } = state.starredBoard;
  const { organizations } = state.organization;
  const { boards } = state.board;

  const { isFetchingUser } = state.user;
  const { isFetchingUserSuccessful } = state.user;

  return {
    userId, 

    starredBoards,
    organizations,
    boards,

    isFetchingUser,
    isFetchingUserSuccessful
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
    boardActions: bindActionCreators(boardActionCreators, dispatch),
    modalsActions: bindActionCreators(modalsActionCreators, dispatch),
    popOverActions: bindActionCreators(popOverActionCreators, dispatch),
    organizationActions: bindActionCreators(organizationActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Boards);