import fetch from 'isomorphic-fetch'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'

function loadUserRequest() {
  return {
    type: LOAD_USER_REQUEST
  }
}

function loadUserSuccess(user) {
  return {
    type: LOAD_USER_SUCCESS,
    user
  }
}

export function loadUser() {
  return dispatch => {
    dispatch(loadUserRequest())

    return fetch(`http://localhost:3001/api/v1/users`)
      .then(response => response.json())
      .then(json => dispatch(loadUserSuccess(json.data.users[0])))
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
    case LOAD_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case LOAD_USER_SUCCESS:
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