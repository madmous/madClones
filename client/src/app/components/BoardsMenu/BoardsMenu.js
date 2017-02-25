import React from 'react';

import { Boards } from '../index';

import './BoardsMenu.css';

export default function BoardsMenu(props) {
  const handleOnChange = event => {
    props.boardsMenuActions.saveUserInput(event.target.value);
  }

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
      <div className="BoardsMenu-Content">
        <div className="BoardsMenu-Content-Search">
          <input 
            onChange={ handleOnChange }
            placeholder="Find boards by name…"
            type="text" 
          />
        </div>
        <Boards 
          displayBoardOptions={ false }
          displayCreateNewBoard={ false }
          boardsClassName="BoardsMenu"
        />
      </div>
    </div>
  );
}