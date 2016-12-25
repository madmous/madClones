import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import './BoardItem.css';

export default class BoardItem extends Component {

  isStarredBoard() {
    if (this.props.isStarredBoard) {
      return <FontAwesome name="star-o" className="Board-Item-Tile-Option Board-Item-Tile-Starred" />
    }

    return <FontAwesome name="star-o" className="Board-Item-Tile-Option" />
  }

  isActiveBoard() {
    if (this.props.isActiveBoard) {
      return (
        <div className="Board-Tile">
          <span className="Board-Tile-Title">
            <span title="Madmous">{ this.props.boardName }</span>
          </span>
          { this.isStarredBoard() }
        </div>
      )
    }

    return (
      <div className="Board-Tile-Add">
        <span>Create new board...</span>
      </div>
    )
  }

  render() {
    return (
      <li className="Board-Item">
  			{ this.isActiveBoard() }
      </li>
    );
  }
}

BoardItem.propTypes = {
  isActiveBoard: PropTypes.bool.isRequired,
  boardName: PropTypes.string.isRequired
}
