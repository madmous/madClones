import FontAwesome from 'react-fontawesome';
import React, { PropTypes } from 'react';

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
      if (value._id === boardIdLocation.split('/')[2]) {
        return value;
      }
    });

    let findBoardIdInOrganizations;

    if (!findBoardIdInBoards && organizations) {
      for (let i = 0; i < organizations.length; i++) {
        findBoardIdInOrganizations = organizations[i].boards.find(value => {
          if (value._id === boardIdLocation.split('/')[2]) {
            return value;
          }
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
    const { starredBoardActions, boardIdLocation, userId } = props;
    const boardId = boardIdLocation.split('/')[2];

    if (starredBoardItem && starredBoardItem.isStarredBoard) {
      starredBoardActions.removeBoardStar(userId, organization._id, boardId);
    } else {
      starredBoardActions.addBoardStar(userId, organization._id, boardId);
    }
  };

  return (
    <div className="Board-View-Header">
      <span>{ renderBoardName() }</span>
      <span>{ renderOrganizationName() }</span>
      <FontAwesome 
        name="star-o" 
        className={ getBoardViewHeaderStarClass() }
        onClick={ handleStarClicked }
      />
    </div>
  );
}

BoardViewHeader.propTypes = propTypes;