import React, { PropTypes } from 'react';

import { CreateOrganization, Board } from '../../components/index';

import './Boards.css';

const propTypes = {
  displayCreateNewBoard: PropTypes.bool.isRequired,
  displayBoardOptions: PropTypes.bool.isRequired,
  boardsClassName: PropTypes.string,

  userId: PropTypes.string.isRequired,
  
  starredBoards: PropTypes.array.isRequired,
  organizations: PropTypes.array.isRequired,
  boards: PropTypes.array.isRequired,

  isFetchingUserSuccessful: PropTypes.bool.isRequired,
  isFetchingUser: PropTypes.bool.isRequired,

  organizationActions: PropTypes.object.isRequired,
  popOverActions: PropTypes.object.isRequired,
  boardActions: PropTypes.object.isRequired,
  modalActions: PropTypes.object.isRequired
}

export default function Boards(props) {
  const getClassName = () => {
    if (props.boardsClassName) {
      return props.boardsClassName + "-Boards";
    }

    return "Boards";
  };

  const canBoardsBeRendered = () => {
    return (!props.isFetchingUser && props.isFetchingUserSuccessful);
  };

  const renderStarredBoards = () => {
    const { starredBoards } = props;

    let starredBoard = null;

    if (canBoardsBeRendered() && starredBoards && starredBoards.length > 0) {
      starredBoard = (
        <Board 
          boardClassName={ getClassName() }
          displayBoardOptions={false}
          boardsToDisplay={starredBoards}
          isStarredBoard
          boardTitle="Starred Board" 
        />
      )
    }

    return starredBoard;
  };

  const renderPersonalBoards = () => {
    const { boards } = props;

    let personalBoard = null;

    if (canBoardsBeRendered() && boards) {
      personalBoard = (
        <Board
          displayCreateNewBoard={ props.displayCreateNewBoard }
          boardClassName={ getClassName() }
          displayBoardOptions={false}
          boardsToDisplay={boards}
          boardTitle="Personal Board"
        />
      )
    }

    return personalBoard;
  };

  const renderOrganizationBoards = () => {
    const { organizations } = props;

    let organizationItem = null;
    organizationItem = organizations && organizations.map((organization) => {

      if (canBoardsBeRendered() && organization.boards) {
        return (
          <Board
            boardClassName={ getClassName() }
            displayCreateNewBoard={ props.displayCreateNewBoard }
            displayBoardOptions={ props.displayBoardOptions }
            boardsToDisplay={organization.boards} 
            organizationId={organization._id}
            boardTitle={organization.displayName} 
            key={organization._id} 
          />
        );
      } else return null;
    });

    return organizationItem;
  };

  const addOrganization = formInput => {
    const { userId } = props;

    props.organizationActions.addOrganization(userId, formInput.name);
  };

  const openModal = event => {
    event.preventDefault();

    props.modalActions.closeAllModals();
    props.modalActions.openCreateOrganizationModal();
    props.popOverActions.hidePopOver();
	};

  return (
    <div className={ getClassName() }>
      { renderStarredBoards() }
      { renderPersonalBoards() }
      { renderOrganizationBoards() }
      <div className={ getClassName() + "-Create" }>
        <span onClick={ () => openModal(event) }>Create a new team...</span>
      </div>
      <CreateOrganization onSubmit={ addOrganization } />
    </div>
  );
}

Boards.propTypes = propTypes;