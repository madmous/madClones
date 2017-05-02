import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import './HeaderBoard.css';

const propTypes = {
  boardsMenuActions: PropTypes.object
};

export default function HeaderBoard(props) {
  const handleClick = () => {
    const { isBoardsMenuOpen, boardsMenuActions } = props;

    if (isBoardsMenuOpen) {
      boardsMenuActions.hideBoardsMenu();
    } else {
      boardsMenuActions.openBoardsMenu();
    }
  };

  return (
    <div 
      className="Header-Button Header-Board-Button"
      tabIndex="0" 
      onClick={ handleClick }
    >
      <FontAwesome name="columns" className="Header-Board-Button-Icon" />
      <span className="Header-Board-Button-Text">Boards</span>
    </div>
  );
}

HeaderBoard.propTypes = propTypes;
