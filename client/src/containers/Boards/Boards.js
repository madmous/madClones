import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Board } from '../../components/index';

import './Boards.css';

class Boards extends Component {

  canBoardsBeRendered() {
    const { isFetchingSuccessful, isFetching } = this.props;

    if (!isFetching && isFetchingSuccessful) {
      return true;
    }

    return false;
  }

  getBoards(boards) {
    if (this.canBoardsBeRendered() && boards && boards.length > 0) {
      return (
        <Board boardTitle="Personal Board" boards={boards}/>
      )
    }
  }

  getOrganizationBoards(organizations) {

    const organizationItem = organizations.map((organization) => {
      if (this.canBoardsBeRendered() &&organization.boards && organization.boards.length > 0) {
        return (
          <Board 
            displayBoardOptions={true}
            boardTitle={organization.displayName} 
            boards={organization.boards} 
            key={organization._id} 
          />
        );
      }
    });

    return (
      organizationItem
    );
  }
  
  render() {
    const { organizations, boards } = this.props;

    return (
			<div className="Boards">

        { this.getBoards(boards) }
        { this.getOrganizationBoards(organizations) }

        <div className="Boards-Create">
          <span>Create a new team...</span>
        </div>
      </div>
    );
  }
}

Boards.propTypes = {
  isFetchingSuccessful: PropTypes.bool.isRequired,
  organizations: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  boards: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  const { isFetchingSuccessful } = state.authentication;
  const { organizations } = state.authentication.user;
  const { isFetching } = state.authentication;
  const { boards } = state.authentication.user;

  return {
    isFetchingSuccessful,
    organizations,
    isFetching,
    boards
  };
}

export default connect(mapStateToProps)(Boards);