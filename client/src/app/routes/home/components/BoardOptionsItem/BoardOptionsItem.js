import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import './BoardOptionsItem.css';

const propTypes = {
  iconName: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired
}

export default class BoardOptionsItem extends Component {
  render() {
    return (
      <div className="BoardOptionsItem">
        <div>
          <FontAwesome className='BoardOptionsItem-Icon' name={ this.props.iconName } />
          <span className="BoardOptionsItem-Name"><span>{ this.props.boardName }</span></span>
        </div>
      </div>
    );
  }
}

BoardOptionsItem.propTypes = propTypes;

