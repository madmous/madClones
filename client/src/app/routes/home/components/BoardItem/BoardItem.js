import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { push } from 'react-router-redux';

import { CreateBoard } from '../../containers/index';

import './BoardItem.css';

const propTypes = {
  isStarredBoardItem: PropTypes.bool,
  organizationName: PropTypes.string,
  organizationId: PropTypes.string.isRequired,
  isActiveBoard: PropTypes.bool.isRequired,
  boardItemId: PropTypes.string,
  boardName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
}

const defaultTypes = {
  isStarredBoardItem: false,
  organizationName: '',
  boardItemId: ''
}

let organizationId = '';

export default function BoardItem(props) {

  const openModal = (event) => {
    organizationId = props.organizationId;

    props.popOverActions.hidePopOver();
    props.modalActions.closeAllModals();
    props.modalActions.openCreateBoardModal();
	}

  const getBoardItemSubName = () => {
    const { organizationName } = props;

    if (organizationName) {
      return (
        <span className="Board-Tile-Title-SubName">{ organizationName }</span>
      )
    }
  }

  const starOrUnstarBoard = (event) => {
    event.stopPropagation();

    const { isStarredBoardItem, starredBoardActions, organizationId, userId, boardId } = props;

    if (isStarredBoardItem) {
      starredBoardActions.removeBoardStar(userId, organizationId, boardId);
    } else {
      starredBoardActions.addBoardStar(userId, organizationId, boardId);
    }
  }

  const isStarredBoard = () => {

    if (props.isStarredBoardItem) {
      return (
        <FontAwesome 
          name="star-o" 
          className="Board-Item-Tile-Option Board-Item-Tile-Starred" 
          onClick={ starOrUnstarBoard }
        />
      )
    }

    return (
      <FontAwesome name="star-o" className="Board-Item-Tile-Option" onClick={ starOrUnstarBoard }/>
    )
  }
  
  const isActiveBoard = () => {
    const { 
      isActiveBoard, 
      boardName, 
      dispatch, 
      boardId
    } = props;

    if (isActiveBoard) {
      return (
        <div 
          className="Board-Tile" 
          onClick={ () => dispatch(push('/boards/' + boardId)) }
        >
          <span className="Board-Tile-Title">
            <span className="Board-Tile-Title-Name">{ boardName }</span>
            { getBoardItemSubName() }
          </span>
          { isStarredBoard() }
        </div>
      )
    }

    return (
      <div className="Board-Tile-Add" onClick={ () => openModal(event) }>
        <span>{ boardName }</span>
      </div>
    )
  }

  const addBoard = (formInput) => {
    const { boardActions, userId } = props;

    boardActions.addBoard(userId, organizationId, formInput.name);
  }

  return (
    <li className="Board-Item">
      { isActiveBoard() }
      <CreateBoard onSubmit={addBoard} />
    </li>
  );
}

BoardItem.propTypes = propTypes;
BoardItem.defaultTypes = defaultTypes;