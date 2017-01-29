import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Cards from './Cards';

import { 
  boardViewActionCreators, 
  cardActionCreators 
} from '../../modules/index';

const mapStateToProps = state => {
  const { isCreateCardFormOpen } = state.boardView;
  const { cards, pathname } = state.card;

  return {
    isCreateCardFormOpen,
    pathname,
    cards
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    boardViewActions: bindActionCreators(boardViewActionCreators, dispatch),
    cardActions: bindActionCreators(cardActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
