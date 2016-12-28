import fetch from 'isomorphic-fetch'

import { loadUserIfNeeded } from '../../redux/modules/authentication';

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
    return saveOrganizationBoard(userId, orgId, boardName);
  } else {
    return savePersonalBoard(userId, boardName);
  }
  
}

function saveOrganizationBoard(userId, orgId, boardName) {
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
      .then(json => {
        dispatch(addBoardSuccess())
        dispatch(loadUserIfNeeded(json.data))
      })
  }
}

function savePersonalBoard(userId, boardName) {
  return dispatch => {
    dispatch(addBoardRequest())

    return fetch(`http://localhost:3001/api/v1/users/${userId}/boards`, 
      { method: 'POST', 
        body: 'name=' + boardName,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
      })
      .then(response => response.json())
      .then(json => {
        dispatch(addBoardSuccess())
        dispatch(loadUserIfNeeded(json.data))
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