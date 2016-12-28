import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import { BoardItem, BoardOptions } from '../index';

import './Board.css';

export default class Board extends Component {
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
        { this.getBoardList() }
      </div>
    )
  }

  getUserClass() {
    if (this.props.displayBoardOptions) {
      return <FontAwesome name="users" />
    } else if (this.props.isStarredBoard) {
      return <FontAwesome name="star" />
    }

    return <FontAwesome name="user" />
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
  
  getBoardList() {
    const { boardsToDisplay } = this.props;
    const boardItems = boardsToDisplay && boardsToDisplay.map((board) => {

      return (
         <BoardItem 
          organizationName={board.organizationName}
          isStarredBoard={board.isStarredBoard}
          isActiveBoard={true} 
          boardName={board.name} 
          key={board._id} 
        />
      )
    });

    if (!this.props.isStarredBoard) {
      boardItems.push(
        <BoardItem 
          isActiveBoard={false} 
          boardName='Create new board...'
          key={boardItems.length}
        />
      )
    }

    return (
      <ul className="Board-List">
        { boardItems }
      </ul>
    );
  }
}

Board.propTypes = {
  displayBoardOptions: PropTypes.bool.isRequired,
  boardsToDisplay: PropTypes.array.isRequired,
  isStarredBoard: PropTypes.bool,
  boardTitle: PropTypes.string.isRequired
}