import React, { Component } from 'react';

import { Header, Notification } from '../../components/index';
import { Boards} from '../../containers/index';

import './Home.css';

export default class Home extends Component {
  componentDidMount() {
    this.props.authenticationActions.getUser();
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
