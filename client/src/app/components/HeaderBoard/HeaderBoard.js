import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import './HeaderBoard.css';

const propTypes = {
  isBoardsMenuOpen: PropTypes.bool,

  boardActions: PropTypes.object
};

export default function HeaderBoard(props) {
  return (
    <div 
      className="Header-Button Header-Board-Button"
      tabIndex="0" 
      onClick={ () => props.boardActions.openBoardsMenu() }
    >
      <FontAwesome name="columns" className="Header-Board-Button-Icon" />
      <span className="Header-Board-Button-Text">Boards</span>
    </div>
  );
}

HeaderBoard.propTypes = propTypes;
