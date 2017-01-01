import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header, Notification } from '../../components/index';
import { Boards} from '../../containers/index';

import { getUser } from '../../redux/modules/authentication';

import './Home.css';

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getUser());
  }

  render() {
    return (
      <div className="Home">
        <Header />
        <Boards />
        { this.getNotificationErrorMessage() }
      </div>
    );
  }

  getNotificationErrorMessage() {
    const { errorMessages } = this.props;

    if (errorMessages && errorMessages.length > 0) {
      return (
        <Notification errorMessages={errorMessages} />
      )
    }
  }
}

function mapStateToProps(state) {
  const { userId, fullName } = state.user;
  const { errorMessages } = state.notification;

  return {
    errorMessages,
    fullName,
    userId
  };
}

export default connect(mapStateToProps)(Home);
