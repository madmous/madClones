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
      if (this.canBoardsBeRendered() && organization.boards && organization.boards.length > 0) {
        return (
          <Board 
            displayBoardOptions={true}
            boardTitle={organization.displayName} 
            boards={organization.boards} 
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

  getStarredBoards(boards, organizationBoards, boardStars) {

    if (this.canBoardsBeRendered() && boardStars && boardStars.length > 0) {
      return (
        <Board 
          isStarredBoard={true}
          boardTitle="Starred Board" 
          boards={this.buildBoardsFromBoardstar(boards, organizationBoards, boardStars)}
        />
      )
    }
  }

  buildBoardsFromBoardstar(boards, organizations, boardStars) {
    const boardsByOrganization = this.buildBoardsByOrganization(organizations);

    let boardsfromBoardStars = [];
    let boardStar = {};

    const isBoardInBoardByOrganization = (element) => {
      let isBoardInBoardByOrganization = false;

      if (boardStar._id === element.id) {
        isBoardInBoardByOrganization = true;
      }

      return isBoardInBoardByOrganization;
    }

    for (let boardByOrganization in boardsByOrganization) {
      
      if (boardsByOrganization.hasOwnProperty(boardByOrganization)) {
        boardsByOrganization[boardByOrganization].forEach((board) => {
          boardStar = board;
          
          if (boardStars.find(isBoardInBoardByOrganization)) {
            boardsfromBoardStars.push(board);
          }
        })
      }
    }

    return boardsfromBoardStars;
  }

  buildBoardsByOrganization(organizations) {
    let boardsByOrganization = {};

    organizations.forEach((organization) => {
      const organizationDisplayName = organization.displayName;
      
      if (!boardsByOrganization[organizationDisplayName]) {
        boardsByOrganization[organizationDisplayName] = [];
      }

      boardsByOrganization[organizationDisplayName].push(...organization.boards);
    });

    return boardsByOrganization;
  }
  
  render() {
    const { organizations, boardStars, boards } = this.props;

    return (
			<div className="Boards">

        { this.getStarredBoards(boards, organizations, boardStars) }
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
  boardStars: PropTypes.array.isRequired,
  boards: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  const { isFetchingSuccessful } = state.authentication;
  const { organizations } = state.authentication.user;
  const { boardStars } = state.authentication.user;
  const { isFetching } = state.authentication;
  const { boards } = state.authentication.user;

  return {
    isFetchingSuccessful,
    organizations,
    boardStars,
    isFetching,
    boards
  };
}

export default connect(mapStateToProps)(Boards);