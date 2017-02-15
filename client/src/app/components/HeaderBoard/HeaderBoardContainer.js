import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { boardActionCreators } from '../../routes/home/modules/index';

import HeaderBoard from './HeaderBoard';

const mapStateToProps = state => {
  const { isBoardsMenuOpen } = state.board;

  return {
    isBoardsMenuOpen
  };
}

const mapDispatchToProps = dispatch => {
  return {
    boardActions: bindActionCreators(boardActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBoard);