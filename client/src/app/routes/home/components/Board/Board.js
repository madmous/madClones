import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import { BoardOptions, BoardItem } from '../index';

import './Board.css';

const propTypes = {
  displayBoardOptions: PropTypes.bool.isRequired,
  isStarredBoardItem: PropTypes.bool.isRequired,
  boardsToDisplay: PropTypes.array.isRequired,
  organizationId: PropTypes.string.isRequired,
  boardTitle: PropTypes.string.isRequired
}

const defaultProps = {
  organizationId: '',
  isStarredBoardItem: false
}

export default function Board(props) {

  const renderUserClassName = () => {
    if (props.displayBoardOptions) {
      return <FontAwesome name="users" />
    } else if (props.isStarredBoard) {
      return <FontAwesome name="star" />
    }

    return <FontAwesome name="user" />
  }

  const renderBoardOptions = () => {
    if (props.displayBoardOptions) {
      return (
        <div className="Board-Header-Options">
          <BoardOptions />
        </div>
      )
    }
  }
  
  const renderBoardList = () => {
    const { boardsToDisplay } = props;
    let organizationId = '';

    const boardItems = boardsToDisplay && boardsToDisplay.map((board) => {

      let boardId = board._id;

      if (board.organizationId) {
        organizationId = board.organizationId;
      } else {
        organizationId = props.organizationId;
      }

      if (board.id && board.isStarredBoard) {
        boardId = board.id;
      } else {
        boardId = board._id;
      }

      return (
         <BoardItem
          organizationName={board.organizationName}
          isStarredBoardItem={board.isStarredBoard}
          organizationId={organizationId}
          boardId={boardId}
          isActiveBoard
          boardName={board.name} 
          key={board._id} 
        />
      )
    });

    if (!props.isStarredBoard) {
      boardItems.push(
        <BoardItem
          isActiveBoard={false} 
          organizationId={props.organizationId}
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

  return (
    <div className="Board">
      <div className="Board-Header">
        <div className="Board-Header-Icon">
          { renderUserClassName() }
        </div>
        <h3>{ props.boardTitle }</h3>
        { renderBoardOptions() }
      </div>
      { renderBoardList() }
    </div>
  )
}

Board.propTypes = propTypes;
Board.defaultProps = defaultProps;