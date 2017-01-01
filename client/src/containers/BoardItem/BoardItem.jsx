import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { addBoard, addBoardStar, removeBoardStar } from '../../redux/modules/board';
import { closeAllModals, openCreateBoardModal } from '../../redux/modules/modals';

import { CreateBoard } from '../../containers/index';

import './BoardItem.css';

const propTypes = {
  userId: PropTypes.string.isRequired,
  organizationId: PropTypes.string.isRequired,
  boardItemId: PropTypes.string,
  isActiveBoard: PropTypes.bool.isRequired,
  organizationName: PropTypes.string,
  isStarredBoardItem: PropTypes.bool,
  boardName: PropTypes.string.isRequired
}

const defaultTypes = {
  organizationName: '',
  isStarredBoardItem: false,
  boardItemId: ''
}

let organizationId = '';

class BoardItem extends Component {
  render() {
    return (
      <li className="Board-Item">
        { this.isActiveBoard() }
        <CreateBoard onSubmit={this.addBoard} />
      </li>
    );
  }

  isActiveBoard() {
    if (this.props.isActiveBoard) {
      return (
        <div className="Board-Tile">
          <span className="Board-Tile-Title">
            <span className="Board-Tile-Title-Name">{ this.props.boardName }</span>
            { this.getBoardItemSubName() }
          </span>
          { this.isStarredBoard() }
        </div>
      )
    }

    return (
      <div className="Board-Tile-Add" onClick={ this.openModal }>
        <span>{ this.props.boardName }</span>
      </div>
    )
  }

  getBoardItemSubName() {
    const { organizationName } = this.props;

    if (organizationName) {
      return (
        <span className="Board-Tile-Title-SubName">{ this.props.organizationName }</span>
      )
    }
  }

  isStarredBoard() {

    if (this.props.isStarredBoardItem) {
      return (
        <FontAwesome 
          name="star-o" 
          className="Board-Item-Tile-Option Board-Item-Tile-Starred" 
          onClick={ this.starOrUnstarBoard }
        />
      )
    }

    return (
      <FontAwesome name="star-o" className="Board-Item-Tile-Option" onClick={ this.starOrUnstarBoard }/>
    )
  }

  addBoard = (formInput) => {
    const { dispatch, userId } = this.props;

    dispatch(addBoard(userId, organizationId, formInput.name));
  }

  openModal = (event) => {
    event.preventDefault();

    const { dispatch } = this.props;
    organizationId = this.props.organizationId;

    dispatch(closeAllModals());
    dispatch(openCreateBoardModal());
	}

  starOrUnstarBoard = () => {
    const { userId, isStarredBoardItem, boardId, organizationId, dispatch } = this.props;

    if (isStarredBoardItem) {
      dispatch(removeBoardStar(userId, organizationId, boardId));
    } else {
      dispatch(addBoardStar(userId, organizationId, boardId));
    }
  }
}

function mapStateToProps(state) {
  const { userId } = state.user;

  return {
    userId
  };
}

BoardItem.propTypes = propTypes;
BoardItem.defaultTypes = defaultTypes;

export default connect(mapStateToProps)(BoardItem);