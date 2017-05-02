import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import { BoardOptions, BoardItem } from '../index';

import './Board.css';

const propTypes = {
  displayCreateNewBoard: PropTypes.bool.isRequired,
  displayBoardOptions: PropTypes.bool.isRequired,
  isOrganizationBoard: PropTypes.bool.isRequired,
  isStarredBoardItem: PropTypes.bool.isRequired,
  boardsToDisplay: PropTypes.array.isRequired,
  organizationId: PropTypes.string.isRequired,
  boardTitle: PropTypes.string.isRequired
};

const defaultProps = {
  displayCreateNewBoard: true,
  isOrganizationBoard: false,
  isStarredBoardItem: false,
  
  organizationId: '',
};

export default function Board(props) {
  const getClassName = () => {
    if (props.boardClassName) {
      return props.boardClassName + "-Board";
    }

    return "Board";
  };

  const renderUserClassName = () => {
    let fontName = 'user';

    if (props.isOrganizationBoard) {
      fontName = 'users';
    } else if (props.isStarredBoard) {
      fontName = 'star';
    }

    return <FontAwesome name={ fontName } />;
  };

  const renderBoardOptions = () => {
    if (props.displayBoardOptions) {
      return (
        <div className={ getClassName() + "-Header-Options" }>
          <BoardOptions />
        </div>
      )
    }
  };
  
  const renderBoardList = () => {
    const { displayCreateNewBoard, boardsToDisplay, isStarredBoard } = props;
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
          boardItemClassName={ getClassName() }
          organizationName={board.organizationName}
          isStarredBoardItem={board.isStarredBoard}
          organizationId={organizationId}
          boardId={boardId}
          isActiveBoard
          boardName={board.name} 
          key={board._id} 
        />
      );
    });

    if (!isStarredBoard && displayCreateNewBoard) {
      boardItems.push(
        <BoardItem
          boardItemClassName={ getClassName() }
          isActiveBoard={false} 
          organizationId={props.organizationId}
          boardName='Create new board...'
          key={boardItems.length}
        />
      )
    }

    return (
      <ul className={ getClassName() + "-List" }>
        { boardItems }
      </ul>
    );
  }

  return (
    <div className={ getClassName() }>
      <div className={ getClassName() + "-Header" }>
        <div className={ getClassName() + "-Header-Icon" }>
          { renderUserClassName() }
        </div>
        <h3>{ props.boardTitle }</h3>
        { renderBoardOptions() }
      </div>
      { renderBoardList() }
    </div>
  );
}

Board.defaultProps = defaultProps;
Board.propTypes = propTypes;