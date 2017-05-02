import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Home from './Home';

import { homeActionCreators } from './modules/index';

const mapStateToProps = state => {
  const { errorMessages } = state.notification;

  return {
    errorMessages
  };
}

const mapDispatchToProps = dispatch => {
  return {
    homeActions: bindActionCreators(homeActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
