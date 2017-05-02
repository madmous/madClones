import FontAwesome from 'react-fontawesome';
import React, { PropTypes } from 'react';

import { UpdateBoardName } from '../../components/index';

import './BoardViewHeader.css';

const propTypes = {
  boardIdLocation: PropTypes.string.isRequired
};

export default function BoardViewHeader(props) {
  let organization;

  const starredBoardItem = (() => {
    const { 
      boardIdLocation,
      organizations,
      boards
    } = props;

    const findBoardIdInBoards = boards && boards.find(value => {
      return value._id === boardIdLocation.split('/')[2]
    });

    let findBoardIdInOrganizations;

    if (!findBoardIdInBoards && organizations) {
      for (let i = 0; i < organizations.length; i++) {
        findBoardIdInOrganizations = organizations[i].boards.find(value => {
          return value._id === boardIdLocation.split('/')[2]
        }); 

        if (findBoardIdInOrganizations) {
          organization = organizations[i];
          break;
        }
      }
    } else {
      return findBoardIdInBoards
    }

    return findBoardIdInOrganizations;
  })();

  const renderBoardName = () => {
    if (starredBoardItem) {
      return starredBoardItem.name;
    }
  };

  const renderOrganizationName = () => {
    if (organization) {
      return organization.name;
    }
    
    return 'Personal Board';
  };

  const getBoardViewHeaderStarClass = () => {
    if (starredBoardItem && starredBoardItem.isStarredBoard) {
      return "Board-View-Header-Star Starred";
    }

    return "Board-View-Header-Star";
  };

  const handleStarClicked = () => {
    const { starredBoardActions, boardIdLocation } = props;
    const boardId = boardIdLocation.split('/')[2];
    const organizationId = organization ? organization._id : null;
    
    if (starredBoardItem && starredBoardItem.isStarredBoard) {
      starredBoardActions.removeBoardStar(organizationId, boardId);
    } else {
      starredBoardActions.addBoardStar(organizationId, boardId);
    }
  };

  const handleBoardNameClicked = () => {
    const { 
      isUpdateBoardNameOpen, 
      boardViewActions 
    } = props;

    if (isUpdateBoardNameOpen) {
      boardViewActions.closeUpdateBoardNameForm();
    } else {
      boardViewActions.openUpdateBoardNameForm();
    }
  };

  const updateBoardName = formInput => {
    const boardId = props.boardIdLocation.split('/')[2];
    const organizationId = organization ? organization._id : null;

    props.boardActions.updateBoardName(organizationId, boardId, formInput.boardName);
  };

  const renderUpdateBoardName = () => {
    let boardName = starredBoardItem && starredBoardItem.name;

    if (props.isUpdateBoardNameOpen) {
      return (
        <UpdateBoardName boardName={ boardName } onSubmit={ updateBoardName } />
      );
    }
  };

  return (
    <div className="Board-View-Header">
      <span onClick={ handleBoardNameClicked }>{ renderBoardName() }</span>
      <span>{ renderOrganizationName() }</span>
      <FontAwesome 
        name="star-o" 
        className={ getBoardViewHeaderStarClass() }
        onClick={ handleStarClicked }
      />
      { renderUpdateBoardName() }
    </div>
  );
}

BoardViewHeader.propTypes = propTypes;