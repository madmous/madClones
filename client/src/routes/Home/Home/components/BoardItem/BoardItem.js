import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

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

export default function BoardItem(props) {

  const openModal = (event) => {
    event.preventDefault();

    organizationId = props.organizationId;

    props.popOverActions.hidePopOver();
    props.modalsActions.closeAllModals();
    props.modalsActions.openCreateBoardModal();
	}

  const getBoardItemSubName = () => {
    const { organizationName } = props;

    if (organizationName) {
      return (
        <span className="Board-Tile-Title-SubName">{ organizationName }</span>
      )
    }
  }

  const starOrUnstarBoard = () => {
    const { userId, isStarredBoardItem, boardId, organizationId } = props;

    if (isStarredBoardItem) {
      props.starredBoardActions.removeBoardStar(userId, organizationId, boardId);
    } else {
      props.starredBoardActions.addBoardStar(userId, organizationId, boardId);
    }
  }

  const isStarredBoard = () => {

    if (props.isStarredBoardItem) {
      return (
        <FontAwesome 
          name="star-o" 
          className="Board-Item-Tile-Option Board-Item-Tile-Starred" 
          onClick={ () => starOrUnstarBoard() }
        />
      )
    }

    return (
      <FontAwesome name="star-o" className="Board-Item-Tile-Option" onClick={ () => starOrUnstarBoard() }/>
    )
  }
  
  const isActiveBoard = () => {
    if (props.isActiveBoard) {
      return (
        <div className="Board-Tile">
          <span className="Board-Tile-Title">
            <span className="Board-Tile-Title-Name">{ props.boardName }</span>
            { getBoardItemSubName() }
          </span>
          { isStarredBoard() }
        </div>
      )
    }

    return (
      <div className="Board-Tile-Add" onClick={ () => openModal(event) }>
        <span>{ props.boardName }</span>
      </div>
    )
  }

  const addBoard = (formInput) => {
    const { userId } = props;

    props.boardActions.addBoard(userId, organizationId, formInput.name);
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