import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CreateCardItem from './CreateCardItem';

import { cardActionCreators } from '../../../modules/index';

function mapStateToProps(state) {
	const { isCreateCardItemFormOpen } = state.card;

	return {
		isCreateCardItemFormOpen
	}
}

function mapDispatchToProps(dispatch) {
  return { 
    cardActions: bindActionCreators(cardActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCardItem);

