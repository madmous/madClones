import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import * as authenticationActionCreators from '../redux/modules/authentication'

import { Home } from '../components/index';

class HomeContainer extends Component {
  render() {
    return (
      <Home {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const { fullName } = state.user;
  const { errorMessages } = state.notification;

  return {
    errorMessages,
    fullName
  };
}

function mapDispatchToProps(dispatch) {
  return { authenticationActions: bindActionCreators(authenticationActionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
