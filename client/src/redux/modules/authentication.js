import fetch from 'isomorphic-fetch'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'

function loadUserRequest() {
  return {
    type: LOAD_USER_REQUEST
  }
}

function loadUserSuccess(loadUserResponse) {
  return {
    type: LOAD_USER_SUCCESS,
    loadUserResponse
  }
}

export function loadUserIfNeeded(loadUserResponse) {
  return dispatch => {
    dispatch(loadUserSuccess(loadUserResponse))
  }
}

export function loadUser() {
  return dispatch => {
    dispatch(loadUserRequest())

    return fetch(`http://localhost:3001/api/v1/users/5864309da51e2929acb8b896`)
      .then(response => response.json())
      .then(json => dispatch(loadUserSuccess(json.data)))
  }
}

const initialState = {
  isFetchingSuccessful: false,
  isFetching: false,

  user: {},
  boards: [],
  organizations: [],
  starredBoards: []
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
        isFetchingSuccessful: true,

        user: action.loadUserResponse.user,
        boards: action.loadUserResponse.boards,
        organizations: action.loadUserResponse.organizations,
        starredBoards: action.loadUserResponse.starredBoards
      })
    default: return state;
  }
}