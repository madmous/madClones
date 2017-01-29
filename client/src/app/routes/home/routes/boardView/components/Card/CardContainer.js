import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Card from './Card';

import { cardActionCreators } from '../../modules/index';

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

export default connect(mapStateToProps, mapDispatchToProps)(Card);
