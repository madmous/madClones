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
    const { starredBoards, boardStars } = this.props;

    if (this.canBoardsBeRendered() && boardStars && boardStars.length > 0) {
      return (
        <Board 
          displayBoardOptions={false}
          boardsToDisplay={starredBoards}
          isStarredBoard={true}
          boardTitle="Starred Board" 
        />
      )
    }
  }

  canBoardsBeRendered() {
    const { isFetchingSuccessful, isFetching } = this.props;

    if (!isFetching && isFetchingSuccessful) {
      return true;
    }

    return false;
  }

  getPersonalBoards() {
    const { starredBoards, boards } = this.props.boards;

    if (this.canBoardsBeRendered() && boards && boards.length > 0) {
      return (
        <Board 
          displayBoardOptions={false}
          boardsToDisplay={boards}
          isStarredBoard={true}
          starredBoards={starredBoards}
          boardTitle="Personal Board" 
          boards
        />
      )
    }
  }

  getOrganizationBoards() {
    const { organizations, starredBoards } = this.props;
    const organizationItem = organizations.map((organization) => {

      if (this.canBoardsBeRendered() && organization.boards && organization.boards.length > 0) {
        return (
          <Board 
            displayBoardOptions={true}
            boardsToDisplay={organization.boards} 
            isStarredBoard={false}
            starredBoards={starredBoards}
            boardTitle={organization.displayName} 
            key={organization._id} 
          />
        );
      }

      return null;
    });

    return (
      organizationItem
    );
  }
}

Boards.propTypes = {
  isFetchingSuccessful: PropTypes.bool.isRequired,
  starredBoards: PropTypes.array.isRequired,
  organizations: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  boardStars: PropTypes.array.isRequired,
  boards: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  const { isFetchingSuccessful } = state.authentication;
  const { starredBoards } = state.authentication;
  const { organizations } = state.authentication.user;
  const { boardStars } = state.authentication.user;
  const { isFetching } = state.authentication;
  const { boards } = state.authentication.user;

  return {
    isFetchingSuccessful,
    starredBoards,
    organizations,
    boardStars,
    isFetching,
    boards
  };
}

export default connect(mapStateToProps)(Boards);