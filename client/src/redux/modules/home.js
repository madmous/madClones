import fetch from 'isomorphic-fetch'

export const ADD_BOARD = 'ADD_BOARD'
export const RECEIVE_RESPONSE = 'RECEIVE_RESPONSE'

function addBoard() {
  return {
    type: ADD_BOARD
  }
}

function receiveResponse(homeResponse) {
  return {
    type: RECEIVE_RESPONSE,
    homeResponse
  }
}

export function fetchBoard(userId, orgId, boardName) {
  return dispatch => {
    dispatch(addBoard())

    return fetch(`http://localhost:3001/api/v1/users/${userId}/organizations/${orgId}/boards`, 
      { method: 'POST', 
        body: 'name=' + boardName,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
      })
      .then(response => response.json())
      .then(json => dispatch(receiveResponse(json.response.message)))
  }
}

const initialState = {
  isBoardFetching: false,
  isBoardFetchingSuccessful : false,
  homeResponse: []
}

export default function home(state = initialState, action) {
  switch (action.type) {
    case ADD_BOARD:
      return Object.assign({}, state, {
        isBoardFetching: true,
      })
    case RECEIVE_RESPONSE:
      return Object.assign({}, state, {
        isBoardFetchingSuccessful: true,
        isBoardFetching: false,
        homeResponse: action.response,
      })
    default: return state;
  }
}