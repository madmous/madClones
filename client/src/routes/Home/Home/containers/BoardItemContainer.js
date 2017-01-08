import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BoardItem from '../components/BoardItem/BoardItem' 

import * as boardActionCreators from '../modules/board';
import * as modalsActionCreators from '../modules/modals';
import * as starredBoardActionCreators from '../modules/starredBoard';

function mapStateToProps(state) {
  const { userId } = state.user;

  return {
    userId
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
    boardActions: bindActionCreators(boardActionCreators, dispatch),
    modalsActions: bindActionCreators(modalsActionCreators, dispatch),
    starredBoardActions: bindActionCreators(starredBoardActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardItem);