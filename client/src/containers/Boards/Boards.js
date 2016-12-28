import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Board } from '../../components/index';

import './Boards.css';

class Boards extends Component {  
  render() {
    return (
      <div className="Boards">
        { this.getStarredBoards() }
        { this.getPersonalBoards() }
        { this.getOrganizationBoards() }

        <div className="Boards-Create">
          <span>Create a new team...</span>
        </div>
      </div>
    );
  }

  getStarredBoards() {
    const { starredBoards } = this.props;

    let starredBoard = null;

    if (this.canBoardsBeRendered() && starredBoards && starredBoards.length > 0) {
      starredBoard = (
        <Board 
          displayBoardOptions={false}
          boardsToDisplay={starredBoards}
          isStarredBoard={true}
          boardTitle="Starred Board" 
        />
      )
    }

    return starredBoard;
  }

  canBoardsBeRendered() {
    return (!this.props.isFetching && this.props.isFetchingSuccessful);
  }

  getPersonalBoards() {
    const { boards } = this.props;

    let personalBoard = null;

    if (this.canBoardsBeRendered() && boards && boards.length > 0) {
      personalBoard = (
        <Board 
          displayBoardOptions={false}
          boardsToDisplay={boards}
          boardTitle="Personal Board"
        />
      )
    }

    return personalBoard;
  }

  getOrganizationBoards() {
    const { organizations } = this.props;

    let organizationItem = organizations.map((organization) => {

      if (this.canBoardsBeRendered() && organization.boards && organization.boards.length > 0) {
        return (
          <Board 
            displayBoardOptions={true}
            boardsToDisplay={organization.boards} 
            organizationId={organization._id}
            boardTitle={organization.displayName} 
            key={organization._id} 
          />
        );
      }
    });

    return organizationItem;
  }
}

Boards.propTypes = {
  isFetchingSuccessful: PropTypes.bool.isRequired,
  starredBoards: PropTypes.array.isRequired,
  organizations: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  boards: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { isFetchingSuccessful } = state.authentication;
  const { starredBoards } = state.authentication;
  const { organizations } = state.authentication;
  const { isFetching } = state.authentication;
  const { boards } = state.authentication;
  const { user } = state.authentication;

  return {
    isFetchingSuccessful,
    starredBoards,
    organizations,
    isFetching,
    boards,
    user
  };
}

export default connect(mapStateToProps)(Boards);