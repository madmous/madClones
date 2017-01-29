import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CardItemsDroppable from './CardItemsDroppable';

import { cardActionCreators } from '../../modules/index';

const mapStateToProps = state => {
  const { 
    createCardFormIndexToOpen, 
    isCreateCardItemFormOpen,
    pathname 
  } = state.card;

  return {
    createCardFormIndexToOpen,
    isCreateCardItemFormOpen,
    pathname
  };
}

const mapDispatchToProps = dispatch => {
  return {
    cardActions: bindActionCreators(cardActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardItemsDroppable);