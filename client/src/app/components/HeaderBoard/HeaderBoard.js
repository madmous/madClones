import FontAwesome from 'react-fontawesome';
import React from 'react';

import './HeaderBoard.css';

export default function HeaderBoard(props) {
  return (
    <div className="Header-Button Header-Board-Button">
      <FontAwesome name="columns" className="Header-Board-Button-Icon" />
      <span className="Header-Board-Button-Text">Boards</span>
    </div>
  );
}
