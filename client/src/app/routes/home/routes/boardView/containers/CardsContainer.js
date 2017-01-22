import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Cards from '../components/Cards/Cards';

import { boardViewActionCreators } from '../modules/index';

const mapStateToProps = state => {
  const { isCreateCardFormOpen } = state.boardView;

  return {
    isCreateCardFormOpen
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    boardViewActions: bindActionCreators(boardViewActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
