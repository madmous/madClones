import fetch from 'isomorphic-fetch'

import { updateOrganizations } from './organization'
import { updateStarredBoards } from './starredBoard'
import { updateBoards } from './board'
import { updateUser } from './user'

export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_BOARDS = 'UPDATE_BOARDS'
export const UPDATE_ORGANIZATIONS = 'UPDATE_ORGANIZATIONS'
export const UPDATE_STARRED_BOARDS = 'UPDATE_STARRED_BOARDS'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'

function loadUserRequest() {
  return {
    type: LOAD_USER_REQUEST
  }
}

function loadUserSuccess() {
  return {
    type: LOAD_USER_SUCCESS
  }
}

export function getUser() {
  return dispatch => {
    dispatch(loadUserRequest())

    return fetch(`http://localhost:3001/api/v1/users/586806d85a8941270e59d7b7`)
      .then(response => response.json())
      .then(json => {
        const payload = json.data;

        dispatch(loadUserSuccess())
        
        dispatch(updateUser(payload))
        dispatch(updateOrganizations(payload))
        dispatch(updateStarredBoards(payload))
        dispatch(updateBoards(payload))
      })
  }
}

const initialState = {
  isFetchingSuccessful: false,
  isFetching: false
}

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case LOAD_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetchingSuccessful: true
      })
    default: return state;
  }
}