import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import './BoardViewHeader.css';

const propTypes = {
  boardOrganization: PropTypes.array,
  boardName: PropTypes.array,
  isStarred: PropTypes.bool
}

export default function BoardViewHeader(props) {

  const getBoardViewHeaderStarClass = () => {
    return "Board-View-Header-Star";
  }

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