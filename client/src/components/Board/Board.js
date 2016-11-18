import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import { BoardItem, BoardOptions } from '../index';

import './Board.css';

class Board extends Component {
  getBoardList() {
    return (
      <ul className="Board-List">
        <BoardItem isActiveBoard={true} isStarredBoard={true} />
        <BoardItem isActiveBoard={true} />
        <BoardItem isActiveBoard={false} />
      </ul>
    );
  }

  getStarredBoardList() {
    return (
      <ul className="Board-List">
        <BoardItem isActiveBoard={true} isStarredBoard={true} />
      </ul>
    );
  }

  getBoards() {
    if (this.props.isPersonalBoard) {
      return (
        <div className="Board">
          <div className="Board-Header">
            <div className="Board-Header-Icon">
              <FontAwesome name="user" />
            </div>
            <h3>Personal Boards</h3>
          </div>
          { this.getBoardList() }
        </div>
      )
    }

    if (this.props.isStarredBoard) {
      return (
        <div className="Board">
          <div className="Board-Header">
            <div className="Board-Header-Icon">
              <FontAwesome name="user" />
            </div>
            <h3>Starred Boards</h3>
          </div>
          { this.getStarredBoardList() }
        </div>
      )
    }

    return (
      <div className="Board">
        <div className="Board-Header">
          <div className="Board-Header-Icon">
            <FontAwesome name="users" />
          </div>
          <h3>Freelance</h3>
          <div className="Board-Header-Options">
            <BoardOptions />
          </div>
        </div>
        { this.getBoardList() }
      </div>
    )
  }

  render() {
    return (
      <div>
        { this.getBoards() }
      </div>
    );
  }
}

export default Board;