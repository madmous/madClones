import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { push } from 'react-router-redux';

import { CreateBoard } from '../index';

import './BoardItem.css';

const propTypes = {
  organizationId: PropTypes.string.isRequired,
  isActiveBoard: PropTypes.bool.isRequired,
  boardItemId: PropTypes.string,
  boardName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,

  boardItemClassName:PropTypes.string,
  isStarredBoardItem: PropTypes.bool,
  organizationName: PropTypes.string,
};

const defaultTypes = {
  isStarredBoardItem: false,
  organizationName: '',
  boardItemId: ''
};

let organizationId = '';

export default function BoardItem(props) {
  const getClassName = () => {
    if (props.boardItemClassName) {
      return `${props.boardItemClassName}-Item`;
    }

    return '-Item';
  };

  const openModal = event => {
    organizationId = props.organizationId;

    props.popOverActions.hidePopOver();
    props.modalActions.closeAllModals();
    props.modalActions.openCreateBoardModal();
	};

  const renderBoardItemSubName = () => {
    const { organizationName } = props;

    if (organizationName) {
      return (
        <span className={ `${getClassName()}-Tile-Title-SubName` } >
        { organizationName }</span>
      )
    }
  };

  const starOrUnstarBoard = event => {
    event.stopPropagation();

    const { 
      starredBoardActions,
      isStarredBoardItem, 
      organizationId, 
      boardId
    } = props;

    if (isStarredBoardItem) {
      starredBoardActions.removeBoardStar(organizationId, boardId);
    } else {
      starredBoardActions.addBoardStar(organizationId, boardId);
    }
  };

  const isStarredBoard = () => {
    if (props.isStarredBoardItem) {
      return (
        <FontAwesome 
          name="star-o"
          className={ `${getClassName()}-Tile-Option ${getClassName()}-Tile-Starred` }
          onClick={ starOrUnstarBoard }
        />
      );
    }

    return (
      <FontAwesome 
        name="star-o" 
        className={ `${getClassName()}-Tile-Option` } 
        onClick={ starOrUnstarBoard }
      />
    );
  };

  const handleClick = () => {
    props.boardsMenu.hideBoardsMenu();
    props.dispatch(push(`/boards/${props.boardId}`));
  }
  
  const isActiveBoard = () => {
    const { 
      isActiveBoard, 
      boardName
    } = props;

    if (isActiveBoard) {
      return (
        <div
          className={ `${getClassName()}-Tile` }
          onClick={ handleClick }
        >
          <span className={ `${getClassName()}-Thumbnail` }></span>
          <span className={ `${getClassName()}-Tile-Title` }>
            <span className={ `${getClassName()}-Tile-Title-Name` }>{ boardName }</span>
            { renderBoardItemSubName() }
          </span>
          { isStarredBoard() }
        </div>
      );
    }

    return (
      <div
        className={ `${getClassName()}-Tile-Add` }
        onClick={ openModal }
      >
        <span>{ boardName }</span>
      </div>
    );
  };

  const addBoard = formInput => {
    const { boardActions, userId } = props;

    boardActions.addBoard(userId, organizationId, formInput.name);
  };

  const renderCreateBoard = () => {
    if (!props.isActiveBoard) {
      return (<CreateBoard onSubmit={ addBoard } />);
    }
  };

  return (
    <li className={ getClassName() }>
      { isActiveBoard() }
      { renderCreateBoard() }
    </li>
  );
}

BoardItem.defaultTypes = defaultTypes;
BoardItem.propTypes = propTypes;