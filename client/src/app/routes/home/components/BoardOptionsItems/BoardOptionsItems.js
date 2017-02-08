import React from 'react';

import { BoardOptionsItem } from '../index';

import './BoardOptionsItems.css';

export default function BoardOptionsItems() {
  const renderBoardOptionsItemList = () => {
    return (
      <ul className="BoardOptions-List">
        <BoardOptionsItem boardName="Boards" iconName="columns"/>
        <BoardOptionsItem boardName="Members" iconName="user"/>
        <BoardOptionsItem boardName="Settings" iconName="sun-o"/>
      </ul>
    );
  };

  return (
    <div className="BoardOptionsItems">
      { renderBoardOptionsItemList() }
    </div>
  );
}
