import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import UpdateBoardName from './UpdateBoardName';

import { boardViewActionCreators } from '../../../modules/index';

function mapStateToProps(state) {
	const { isUpdateBoardNameOpen } = state.boardView;

	return {
		isUpdateBoardNameOpen
	}
}

function mapDispatchToProps(dispatch) {
  return { 
    boardViewActions: bindActionCreators(boardViewActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBoardName);

