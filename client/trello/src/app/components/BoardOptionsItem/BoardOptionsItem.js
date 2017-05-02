import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import './BoardOptionsItem.css';

const propTypes = {
  iconName: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired
}

export default function BoardOptionsItem(props) {
  const { iconName, boardName } = props;
  
  return (
    <div className="BoardOptionsItem">
      <FontAwesome className='BoardOptionsItem-Icon' name={ iconName } />
      <span className="BoardOptionsItem-Name"><span>{ boardName }</span></span>
    </div>
  );
}

BoardOptionsItem.propTypes = propTypes;

