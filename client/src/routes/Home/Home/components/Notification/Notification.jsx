import React, { Component, PropTypes } from 'react';
import './Notification.css';

const propTypes = {
  errorMessages: PropTypes.array.isRequired
}

export default class Notification extends Component {

  render() {
    return ( 
      <div className="Notification">
      { this.getErrorMessages() }
      </div>
    );
  }

  getErrorMessages() {
    const { errorMessages } = this.props;
    let messages = null;

    messages = errorMessages.length > 0 && errorMessages.map((message, index) => {
      return (
        <p className="Notification-Item" key={index} >{ message }</p>
      )
    });

    return messages;
  }
}

Notification.propTypes = propTypes;