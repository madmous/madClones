import React, { Component } from 'react';

import { Header, Notification } from './components/index';
import { Boards, PopOver } from './containers/index';

import './Home.css';

export default class Home extends Component {
  componentDidMount() {
    this.props.userActions.getUser();
  }

  render() {
    return (
      <div className="Home">
        <Header />
        <Boards />
        { this.getNotificationErrorMessage() }
        { this.getPopOver() }
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

  getPopOver() {
    if (this.props.displayPopOver) {
      return (
        <PopOver />
      )
    }
  }
}
