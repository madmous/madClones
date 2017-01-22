import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CardItems from '../components/CardItems/CardItems';

import { cardActionCreators } from '../modules/index';

const mapStateToProps = state => {
  const { createCardFormIndexToOpen, isCreateCardItemFormOpen } = state.card;

  return {
    createCardFormIndexToOpen,
    isCreateCardItemFormOpen
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    cardActions: bindActionCreators(cardActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardItems);
