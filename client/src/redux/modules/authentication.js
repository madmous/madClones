import fetch from 'isomorphic-fetch'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const UPDATE_USER = 'UPDATE_USER'

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

export function updateUser(payload) {
  return {
    type: UPDATE_USER,
    payload
  }
}

export function getUser() {
  return dispatch => {
    dispatch(loadUserRequest())

    return fetch(`http://localhost:3001/api/v1/users/5864309da51e2929acb8b896`)
      .then(response => response.json())
      .then(json => {
        const payload = json.data;

        dispatch(loadUserSuccess())
        dispatch(updateUser(payload))
      })
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
        isFetchingSuccessful: true
      })
    case UPDATE_USER:
      return Object.assign({}, state, {
        user: action.payload.user,
        boards: action.payload.boards,
        organizations: action.payload.organizations,
        starredBoards: action.payload.starredBoards
      })
    default: return state;
  }
}