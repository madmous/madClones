import React from 'react';

import './BoardsMenu.css';

export default function BoardsMenu(props) {
  const focusOnBoardsMenu = isFocusOnBoardsMenu => {
    if (isFocusOnBoardsMenu) {
      props.boardsMenuActions.focusOnBoardsMenu();
    } else {
      props.boardsMenuActions.blurOnBoardsMenu();
    }
  }

  return(
    <div 
      className="BoardsMenu"
      tabIndex="0" 
      onFocus={() => { focusOnBoardsMenu(true) }}
      onBlur={() => { focusOnBoardsMenu(false) }}
    >
      <p>fdfsfdsfsdffß</p>
    </div>
  );
}