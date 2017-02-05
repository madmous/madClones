import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CreateBoard from './CreateBoard';

import * as ModalActionCreators from '../../../modules/index';

function mapStateToProps(state) {
	const { isCreateBoardModalOpen } = state.modals;

	return {
		isCreateBoardModalOpen
	}
}

function mapDispatchToProps(dispatch) {
  return { 
    modalActions: bindActionCreators(ModalActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBoard);

