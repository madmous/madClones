import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import './HeaderUser.css';

const propTypes = {
  fullName: PropTypes.string.isRequired
}

export default function HeaderUser(props) {

  return (
    <div className="Header-User">
      <FontAwesome name="plus" className="Header-Button-Icon Header-User-Add" />
      <span className="Header-Button Header-User-Menu">
        <span className="Header-User-Image"></span>
        <span className="Header-User-Name">{ props.fullName }</span>
      </span>
      <FontAwesome name="info" className="Header-Button-Icon Header-Button Header-User-Info" />
      <FontAwesome name="bell-o" className="Header-Button-Icon Header-User-Notifications" />
    </div>
  );
}

HeaderUser.propTypes = propTypes;