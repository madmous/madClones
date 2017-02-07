import FontAwesome from 'react-fontawesome';
import React from 'react';

import './BoardViewHeader.css';

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