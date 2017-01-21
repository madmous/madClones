import React, { Component } from 'react';

import { Notification } from './components/index';
import { Boards } from './containers/index';

import './Home.css';

export default class Home extends Component {

  componentDidMount () {
    document.title = 'Boards | Trello';
    this.props.homeActions.gethome();
  }

  getNotificationErrorMessage () {
    const { errorMessages } = this.props;

    if (errorMessages && errorMessages.length > 0) {
      return (
        <Notification errorMessages={errorMessages} />
      )
    }
  }

  render () {
    return (
      <div className="Home" >
        <Boards />
        { this.getNotificationErrorMessage() }
      </div>
    );
  }
}