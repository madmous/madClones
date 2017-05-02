import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CreateCard from './CreateCard';

import { boardViewActionCreators } from '../../../modules/index';

function mapStateToProps(state) {
	const { isCreateCardFormOpen } = state.boardView;

	return {
		isCreateCardFormOpen
	}
}

function mapDispatchToProps(dispatch) {
  return { 
    boardViewActions: bindActionCreators(boardViewActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCard);

