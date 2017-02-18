import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { boardsMenuActionCreators } from '../../modules/index';

import BoardsMenu from './BoardsMenu';

const mapDispatchToProps = dispatch => {
  return {
    boardsMenuActions: bindActionCreators(boardsMenuActionCreators, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(BoardsMenu);