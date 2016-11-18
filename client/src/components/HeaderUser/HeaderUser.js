import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import './HeaderUser.css';

export default class HeaderUser extends Component {
  render() {
    return (
      <div className="Header-User">
        <FontAwesome name="plus" className="Header-Button-Icon Header-User-Add" />
        <span className="Header-Button Header-User-Menu">
          <span className="Header-User-Image"></span>
          <span className="Header-User-Name">Moustapha Amadou Diouf</span>
        </span>
        <FontAwesome name="info" className="Header-Button-Icon Header-Button Header-User-Info" />
        <FontAwesome name="bell-o" className="Header-Button-Icon Header-User-Notifications" />
      </div>
    );
  }
}