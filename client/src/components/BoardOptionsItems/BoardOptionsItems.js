import React, { Component } from 'react';

import { BoardOptionsItem } from '../index';

import './BoardOptionsItems.css';

export default class BoardOptionsItems extends Component {
  render() {
    return (
      <div className="BoardOptionsItems">
        { this.getBoardOptionsItemList() }
      </div>
    );
  }
  
  getBoardOptionsItemList() {
    return (
      <ul className="BoardOptions-List">
        <BoardOptionsItem boardName="Boards" iconName="columns"/>
        <BoardOptionsItem boardName="Members" iconName="user"/>
        <BoardOptionsItem boardName="Settings" iconName="sun-o"/>
      </ul>
    );
  }
}
