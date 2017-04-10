import FontAwesome from 'react-fontawesome';
import React, { PropTypes } from 'react';

import './BoardViewHeader.css';

const propTypes = {
  boardIdLocation: PropTypes.string.isRequired
};

export default function BoardViewHeader(props) {
  let organizationId = '';

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
          organizationId = organizations[i]._id;
          break;
        }
      }
    } else {
      return findBoardIdInBoards
    }

    return findBoardIdInOrganizations;
  })();

  const getBoardViewHeaderStarClass = () => {
    if (starredBoardItem && starredBoardItem.isStarredBoard) {
      return "Board-View-Header-Star Starred";
    }

    return "Board-View-Header-Star";
  };

  const handleClick = () => {
    const { starredBoardActions, boardIdLocation, userId } = props;
    const boardId = boardIdLocation.split('/')[2];

    if (starredBoardItem && starredBoardItem.isStarredBoard) {
      starredBoardActions.removeBoardStar(userId, organizationId, boardId);
    } else {
      starredBoardActions.addBoardStar(userId, organizationId, boardId);
    }
  };

  return (
    <div className="Board-View-Header">
      <span>Trello Clone</span>
      <span>Personal Projects</span>
      <FontAwesome 
        name="star-o" 
        className={ getBoardViewHeaderStarClass() }
        onClick={ handleClick }
      />
    </div>
  );
}

BoardViewHeader.propTypes = propTypes;