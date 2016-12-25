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
    const { boardsToDisplay, isStarredBoard } = this.props;
    const boardItems = boardsToDisplay && boardsToDisplay.map((board) => {
      
      if (!isStarredBoard && this.isBoardInStarredBoards(board)) {
        return (
          <BoardItem 
            isStarredBoard={true}
            isActiveBoard={true} 
            boardName={board.name} 
            key={board._id} 
          />
        );
      }

      if (isStarredBoard) {
        return (
          <BoardItem 
            organizationName={board.organizationName}
            isStarredBoard={true}
            isActiveBoard={true} 
            boardName={board.name} 
            key={board._id} 
          />
        );
      } else {
        return (
          <BoardItem 
            isStarredBoard={false}
            isActiveBoard={true} 
            boardName={board.name} 
            key={board._id} 
          />
        );
      }
    });

    if (!this.props.isStarredBoard) {
      boardItems.push(
        <BoardItem 
          isStarredBoard={false}
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

  isBoardInStarredBoards(board) {
    let isBoardInStarredBoards = false;
    const starredBoards = this.props.starredBoards;

    starredBoards.forEach((starredBoard) => {
      if (starredBoard._id === board._id) {
        isBoardInStarredBoards = true;
      }
    });

    return isBoardInStarredBoards;
  }
}

Board.propTypes = {
  displayBoardOptions: PropTypes.bool.isRequired,
  boardsToDisplay: PropTypes.array.isRequired,
  isStarredBoard: PropTypes.bool.isRequired,
  starredBoards: PropTypes.array,
  boardTitle: PropTypes.string.isRequired,
}