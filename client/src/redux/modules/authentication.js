import fetch from 'isomorphic-fetch'

export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'

function requestUser() {
  return {
    type: REQUEST_USER
  }
}

function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    user
  }
}

export function fetchUser() {
  
  return dispatch => {
    dispatch(requestUser())

    return fetch(`http://localhost:3001/api/v1/users`)
      .then(response => response.json())
      .then(json => dispatch(receiveUser(json.data.users[0])))
  }
}

const initialState = {
  isFetching: false,
  isFetchingSuccessful : false,
  user: {
    organizations: [],
    boardStars: [],
    boards: []
  }
}

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_USER:
      return Object.assign({}, state, {
        isFetchingSuccessful: true,
        isFetching: false,
        user: action.user
      })
    default: return state;
  }
}