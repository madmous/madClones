import fetch from 'isomorphic-fetch'

export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'

function requestUser() {
  return {
    type: REQUEST_USER
  }
}

function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    user
  }
}

export function fetchUser() {
  return dispatch => {
    dispatch(requestUser())

    return fetch(`http://localhost:3001/api/v1/users`)
      .then(response => response.json())
      .then(json => dispatch(receiveUser(json.data.users[0])))
  }
}

const initialState = {
  isFetching: false,
  isFetchingSuccessful : false,
  starredBoards: [],
  user: {
    organizations: [],
    boardStars: [],
    boards: []
  }
}

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_USER:
      return Object.assign({}, state, {
        isFetchingSuccessful: true,
        starredBoards: buildBoardsFromBoardstar(action.user),
        isFetching: false,
        user: action.user,
      })
    default: return state;
  }
}

function buildBoardsFromBoardstar(user) {
  const { boards, organizations, boardStars } = user;
  const boardsByOrganization = buildBoardsByOrganization(organizations);

  let boardsFromBoardStars = [];
  let boardStar = [];

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
        let boardCopy = { ...board };

        boardCopy.organizationName = boardByOrganization;
        boardStar = { ...boardCopy };
        
        if (boardStars.find(isBoardInBoardByOrganization)) {
          boardsFromBoardStars.push(boardCopy);
        }
      })
    }
  }

  boards.forEach((board) => {
    boardStar = board;
    
    if (boardStars.find(isBoardInBoardByOrganization)) {
      boardsFromBoardStars.push(board);
    }
  })

  return boardsFromBoardStars;
}

function buildBoardsByOrganization(organizations) {
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