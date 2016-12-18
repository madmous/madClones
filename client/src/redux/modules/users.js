import fetch from 'isomorphic-fetch'

export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'

let initialState = {
  isFetching: false,
  items: []
}

export default function users(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST_USERS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_USERS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.users,
        lastUpdated: action.receivedAt
      })
    default: return state;
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

function requestUsers() {
  return {
    type: REQUEST_USERS
  }
}

function receiveUsers(json) {
  return {
    type: RECEIVE_USERS,
    users: json.data.users,
    receivedAt: Date.now()
  }
}