import { connect } from 'react-redux';

import BoardViewHeader from './BoardViewHeader';

const mapStateToProps = state => {
  const { starredBoards } = state.starredBoard;

  return {
    starredBoards
  };
};

export default connect(mapStateToProps, null)(BoardViewHeader);
