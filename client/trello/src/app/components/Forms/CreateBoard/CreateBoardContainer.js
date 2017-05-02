import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CreateBoard from './CreateBoard';

import { modalActionCreators } from '../../../routes/home/modules/index';

function mapStateToProps(state) {
	const { isCreateBoardModalOpen } = state.modals;

	return {
		isCreateBoardModalOpen
	}
}

function mapDispatchToProps(dispatch) {
  return { 
    modalActions: bindActionCreators(modalActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBoard);

