import fetch from 'isomorphic-fetch'

export const ADD_BOARD_REQUEST = 'ADD_BOARD_REQUEST'
export const ADD_BOARD_SUCCESS = 'ADD_BOARD_SUCCESS'

function addBoardRequest() {
  return {
    type: ADD_BOARD_REQUEST
  }
}

function addBoardSuccess(homeResponse) {
  return {
    type: ADD_BOARD_SUCCESS,
    homeResponse
  }
}

export function addBoard(userId, orgId, boardName) {
  return dispatch => {
    dispatch(addBoardRequest())

    return fetch(`http://localhost:3001/api/v1/users/${userId}/organizations/${orgId}/boards`, 
      { method: 'POST', 
        body: 'name=' + boardName,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
      })
      .then(response => response.json())
      .then(json => dispatch(addBoardSuccess(json.response.message)))
  }
}

const initialState = {
  isBoardFetching: false,
  isBoardFetchingSuccessful: false,
  homeResponse: []
}

export default function home(state = initialState, action) {
  switch (action.type) {
    case ADD_BOARD_REQUEST:
      return Object.assign({}, state, {
        isBoardFetching: true,
      })
    case ADD_BOARD_SUCCESS:
      return Object.assign({}, state, {
        isBoardFetchingSuccessful: true,
        isBoardFetching: false,
        homeResponse: action.response,
      })
    default: return state;
  }
}