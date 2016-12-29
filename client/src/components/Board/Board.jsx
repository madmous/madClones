import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import { BoardOptions } from '../index';
import { BoardItem } from '../../containers/index';

import './Board.css';

const propTypes = {
  displayBoardOptions: PropTypes.bool.isRequired,
  boardsToDisplay: PropTypes.array.isRequired,
  boardTitle: PropTypes.string.isRequired,
  organizationId: PropTypes.string,
  isStarredBoard: PropTypes.bool
}

const defaultProps = {
  organizationId: '',
  isStarredBoard: false
}

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
          isStarredBoardItem={board.isStarredBoard}
          isActiveBoard
          boardName={board.name} 
          key={board._id} 
        />
      )
    });

    if (!this.props.isStarredBoard) {
      boardItems.push(
        <BoardItem 
          isActiveBoard={false} 
          organizationId={this.props.organizationId}
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

Board.propTypes = propTypes;
Board.defaultProps = defaultProps;