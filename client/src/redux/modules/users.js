import fetch from 'isomorphic-fetch'

export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'

function requestUsers() {
  return {
    type: REQUEST_USERS
  }
}

function receiveUsers(json) {
  return {
    type: RECEIVE_USERS,
    users: json.data.users
  }
}

export function fetchUsers() {
  
  return dispatch => {
    dispatch(requestUsers())

    return fetch(`http://localhost:3001/api/v1/users`)
      .then(response => response.json())
      .then(json => dispatch(receiveUsers(json)))
  }
}

const initialState = {
  isFetching: false,
  users: []
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USERS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_USERS:
      return Object.assign({}, state, {
        isFetching: false,
        users: action.users
      })
    default: return state;
  }
}