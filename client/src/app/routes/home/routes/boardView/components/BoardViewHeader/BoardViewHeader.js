import FontAwesome from 'react-fontawesome';
import React, { PropTypes } from 'react';

import './BoardViewHeader.css';

const propTypes = {
  boardIdLocation: PropTypes.string.isRequired
}

export default function BoardViewHeader(props) {
  const getBoardViewHeaderStarClass = () => {
    const { starredBoards, boardIdLocation } = props;

    const findBoardId = value => {
      return value.id === boardIdLocation.split('/')[2];
    };

    if (starredBoards && starredBoards.find(findBoardId)) {
      return "Board-View-Header-Star Starred";
    }

    return "Board-View-Header-Star";
  };

  return (
    <div className="Board-View-Header">
      <span>Trello Clone</span>
      <span>Personal Projects</span>
      <FontAwesome 
        name="star-o" 
        className={ getBoardViewHeaderStarClass() }
      />
    </div>
  );
}

BoardViewHeader.propTypes = propTypes;