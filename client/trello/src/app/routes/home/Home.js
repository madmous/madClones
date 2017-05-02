import React, { Component, PropTypes } from 'react';

import { Notification, Boards } from '../../components/index';

import './Home.css';

const propTypes = {
  errorMessages: PropTypes.array.isRequired,
  homeActions: PropTypes.object.isRequired
};

export default class Home extends Component {
  componentDidMount () {
    document.title = 'Boards | Trello';
    this.props.homeActions.getHome();
  }

  renderNotificationErrorMessage () {
    const { errorMessages } = this.props;

    if (errorMessages && errorMessages.length > 0) {
      return (
        <Notification errorMessages={errorMessages} />
      );
    } else {
      return null;
    }
  }

  render () {
    return (
      <div className="Home" >
        <Boards 
          displayCreateNewBoard
          displayBoardOptions
        />
        { this.renderNotificationErrorMessage() }
      </div>
    );
  }
}

Home.propTypes = propTypes;