import fetch from 'isomorphic-fetch'

import { updateUser } from '../../redux/modules/authentication';

export const ADD_BOARD_REQUEST = 'ADD_BOARD_REQUEST'
export const ADD_BOARD_SUCCESS = 'ADD_BOARD_SUCCESS'

function addBoardRequest() {
  return {
    type: ADD_BOARD_REQUEST
  }
}

function addBoardSuccess() {
  return {
    type: ADD_BOARD_SUCCESS
  }
}

export function addBoard(userId, orgId, boardName) {

  if (orgId) {
    return saveBoard(`http://localhost:3001/api/v1/users/${userId}/organizations/${orgId}/boards`, boardName);
  }

  return saveBoard(`http://localhost:3001/api/v1/users/${userId}/boards`, boardName);
  
}

function saveBoard(url, boardName) {
  return dispatch => {
    dispatch(addBoardRequest())

    return fetch(url, 
      { method: 'POST', 
        body: 'name=' + boardName,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
      })
      .then(response => response.json())
      .then(json => {
        dispatch(addBoardSuccess())
        dispatch(updateUser(json.data))
      })
  }
}

const initialState = {
  isBoardFetching: false,
  isBoardFetchingSuccessful: false
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
        isBoardFetching: false
      })
    default: return state;
  }
}