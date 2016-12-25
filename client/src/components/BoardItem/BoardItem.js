import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import './BoardItem.css';

export default class BoardItem extends Component {
  render() {
    return (
      <li className="Board-Item">
  			{ this.isActiveBoard() }
      </li>
    );
  }

  isActiveBoard() {
    if (this.props.isActiveBoard) {
      return (
        <div className="Board-Tile">
          <span className="Board-Tile-Title">
            <span className="Board-Tile-Title-Name">{ this.props.boardName }</span>
            { this.getBoardItemSubName() }
          </span>
          { this.isStarredBoard() }
        </div>
      )
    }

    return (
      <div className="Board-Tile-Add">
        <span>{ this.props.boardName }</span>
      </div>
    )
  }

  getBoardItemSubName() {
    const { organizationName } = this.props;

    if (organizationName) {
      return (
        <span className="Board-Tile-Title-SubName">{ this.props.organizationName }</span>
      )
    }
  }

  isStarredBoard() {
    if (this.props.isStarredBoard) {
      return <FontAwesome name="star-o" className="Board-Item-Tile-Option Board-Item-Tile-Starred" />
    }

    return <FontAwesome name="star-o" className="Board-Item-Tile-Option" />
  }
}

BoardItem.propTypes = {
  isActiveBoard: PropTypes.bool.isRequired,
  organizationName: PropTypes.string,
  boardName: PropTypes.string.isRequired
}
