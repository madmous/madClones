import React from 'react';

import PropTypes from 'prop-types';

import './Notification.css';

const propTypes = {
  errorMessages: PropTypes.array.isRequired
}

export default function Notification(props) {
  const renderErrorMessages = () => {
    const { errorMessages } = props;
    let messages = null;

    messages = errorMessages.length > 0 && errorMessages.map((message, index) => {
      return (
        <p className="Notification-Item" key={index} >{ message }</p>
      )
    });

    return messages;
  };

  return ( 
    <div className="Notification">
    { renderErrorMessages() }
    </div>
  );
}

Notification.propTypes = propTypes;