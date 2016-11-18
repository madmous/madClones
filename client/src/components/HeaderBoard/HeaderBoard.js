import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import './HeaderBoard.css';

export default class HeaderBoard extends Component {
  render() {
    return (
      <div className="Header-Button Header-Board-Button">
        <FontAwesome name="columns" className="Header-Board-Button-Icon" />
        <span className="Header-Board-Button-Text">Boards</span>
      </div>
    );
  }
}
