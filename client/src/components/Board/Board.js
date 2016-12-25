import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import { BoardItem, BoardOptions } from '../index';

import './Board.css';

export default class Board extends Component {
  
  getBoardList(boards) {

    const boardItems = boards && boards.map((board) => {
      return (
				<BoardItem boardName={board.name} isActiveBoard={true} key={board._id} />
      );
    });

    return (
      <ul className="Board-List">
        { boardItems }
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

  getBoardOptions() {
    if (this.props.displayBoardOptions) {
      return (
        <div className="Board-Header-Options">
          <BoardOptions />
        </div>
      )
    }
  }

  getUserClass() {
    if (this.props.displayBoardOptions) {
      return <FontAwesome name="users" />
    } else if (this.props.isStarredBoard) {
      return <FontAwesome name="star" />
    }

    return <FontAwesome name="user" />
  }

  render() {
    return (
      <div className="Board">
        <div className="Board-Header">
          <div className="Board-Header-Icon">
            { this.getUserClass() }
          </div>
          <h3>{ this.props.boardTitle}</h3>
          { this.getBoardOptions() }
        </div>
        { this.getBoardList(this.props.boards) }
      </div>
    )
  }
}

Board.propTypes = {
  displayBoardOptions: PropTypes.bool,
  isStarredBoard: PropTypes.bool,
  boardTitle: PropTypes.string.isRequired,
  boards: PropTypes.array.isRequired
}