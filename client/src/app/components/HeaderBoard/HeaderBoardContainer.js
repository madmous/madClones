import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { boardsMenuActionCreators } from '../../modules/index';

import HeaderBoard from './HeaderBoard';

const mapStateToProps = state => {
  const { isBoardsMenuOpen } = state.boardsMenu;

  return {
    isBoardsMenuOpen
  };
}

const mapDispatchToProps = dispatch => {
  return {
    boardsMenuActions: bindActionCreators(boardsMenuActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBoard);