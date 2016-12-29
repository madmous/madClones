import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { addBoard } from '../../redux/modules/home';

import './BoardItem.css';

const propTypes = {
  isActiveBoard: PropTypes.bool.isRequired,
  organizationName: PropTypes.string,
  isStarredBoardItem: PropTypes.bool,
  boardName: PropTypes.string.isRequired
}

const defaultTypes = {
  organizationName: '',
  isStarredBoardItem: false
}

class BoardItem extends Component {
  constructor(props) {
    super(props);
    this.addBoard = this.addBoard.bind(this);
  }

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
        <div className="Board-Tile" onClick={() => { this.addBoard(this) }}>
          <span className="Board-Tile-Title">
            <span className="Board-Tile-Title-Name">{ this.props.boardName }</span>
            { this.getBoardItemSubName() }
          </span>
          { this.isStarredBoard() }
        </div>
      )
    }

    return (
      <div className="Board-Tile-Add" onClick={() => { this.addBoard(this) }}>
        <span>{ this.props.boardName }</span>
      </div>
    )
  }

  addBoard(board) {
    const { dispatch, organizationId, user } = this.props;
    
    dispatch(addBoard(user._id, organizationId, 'TT'));
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
    if (this.props.isStarredBoardItem) {
      return <FontAwesome name="star-o" className="Board-Item-Tile-Option Board-Item-Tile-Starred" />
    }

    return <FontAwesome name="star-o" className="Board-Item-Tile-Option" />
  }
}

function mapStateToProps(state) {
  const { isBoardFetchingSuccessful } = state.home;
  const { isBoardFetching } = state.home;
  const { user } = state.authentication;

  return {
    isBoardFetchingSuccessful,
    isBoardFetching,
    user
  };
}

BoardItem.propTypes = propTypes;
BoardItem.defaultTypes = propTypes;

export default connect(mapStateToProps)(BoardItem);