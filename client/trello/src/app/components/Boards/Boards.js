import React, { PropTypes } from 'react';

import { CreateOrganization, Board } from '../../components/index';

import './Boards.css';

const propTypes = {
  displayCreateNewBoard: PropTypes.bool.isRequired,
  displayBoardOptions: PropTypes.bool.isRequired,
  boardsClassName: PropTypes.string,

  userId: PropTypes.string.isRequired,
  userInput: PropTypes.string.isRequired,
  
  starredBoards: PropTypes.array.isRequired,
  organizations: PropTypes.array.isRequired,
  boards: PropTypes.array.isRequired,

  isFetchingUserSuccessful: PropTypes.bool.isRequired,
  isFetchingUser: PropTypes.bool.isRequired,

  organizationActions: PropTypes.object.isRequired,
  popOverActions: PropTypes.object.isRequired,
  boardActions: PropTypes.object.isRequired,
  modalActions: PropTypes.object.isRequired
};

export default function Boards(props) {
  const getClassName = () => {
    if (props.boardsClassName) {
      return props.boardsClassName + "-Boards";
    }

    return "Boards";
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

  const canBoardsBeRendered = () => {
    return (!props.isFetchingUser && props.isFetchingUserSuccessful);
  };

  const canBoardsBeDisplayed = boards => {
    if (props.boardsClassName === 'BoardsMenu') {
      return boards && boards.length > 0;
    }

    return boards;
  };

  const renderOrganizationBoards = organizations => {
    let organizationItem = null;

    organizationItem = organizations && organizations.length > 0 && organizations.map(organization => {
      if (canBoardsBeRendered() && canBoardsBeDisplayed(organization.boards)) {
        return (
          <Board
            boardClassName={ getClassName() }
            displayCreateNewBoard={ props.displayCreateNewBoard }
            displayBoardOptions={ props.displayBoardOptions }
            isOrganizationBoard
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

  const renderPersonalBoards = boards => {
    let personalBoard = null;

    if (canBoardsBeRendered() && canBoardsBeDisplayed(boards)) {
      personalBoard = (
        <Board
          displayCreateNewBoard={ props.displayCreateNewBoard }
          boardClassName={ getClassName() }
          displayBoardOptions={false}
          isOrganizationBoard={false}
          boardsToDisplay={boards}
          boardTitle="Personal Board"
        />
      )
    }

    return personalBoard;
  };

  const renderStarredBoards = starredBoards => {
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

  const filterBoards = items => {
    return items.filter(item => {
      return item.name.toLowerCase().indexOf(props.userInput.toLowerCase()) >= 0;
    });
  };

  const renderBoards = () => {
    const { boardsClassName, boardsMenuInput } = props;
    const { starredBoards, organizations, boards } = props;

    if (boardsClassName === 'BoardsMenu' && boardsMenuInput !== '') {
      let filteredStarredBoards = filterBoards(starredBoards);
      let filteredBoards = filterBoards(boards);

      let filteredOrganizations = organizations.map(organization => {
        let organizationClone = {...organization};

        organizationClone.boards = filterBoards(organizationClone.boards);

        return organizationClone;
      });

      return (
        <div>
          { renderStarredBoards(filteredStarredBoards) }
          { renderPersonalBoards(filteredBoards) }
          { renderOrganizationBoards(filteredOrganizations) }
        </div>
      )
    }

    return (
      <div>
        { renderStarredBoards(starredBoards) }
        { renderPersonalBoards(boards) }
        { renderOrganizationBoards(organizations) }
      </div>
    )
  };

  return (
    <div className={ getClassName() }>
      { renderBoards() }
      <div className={ getClassName() + "-Create" }>
        <span onClick={ () => openModal(event) }>Create a new team...</span>
      </div>
      <CreateOrganization onSubmit={ addOrganization } />
    </div>
  );
}

Boards.propTypes = propTypes;