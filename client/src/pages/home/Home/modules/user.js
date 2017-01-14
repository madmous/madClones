import { updateOrganizations } from './organization'
import { updateStarredBoards } from './starredBoard'
import { closeAllModals } from './modals'
import { updateBoards } from './board'

import { url } from '../../../../utils/url';

const UPDATE_USER = 'UPDATE_USER'

const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'

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

    return fetch(url + `api/v1/users/`, 
      { method: 'GET',
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('userId')
        },
      })
      .then(response => response.json())
      .then(json => {
        const payload = json.data;

        dispatch(closeAllModals());
        dispatch(loadUserSuccess())
        
        dispatch(updateUser(payload))
        dispatch(updateOrganizations(payload))
        dispatch(updateStarredBoards(payload))
        dispatch(updateBoards(payload))
      })
  }
}

const initialState = {
  userId: '',
  fullName: '',
  errorMessage: '',

  isFetchingUser: false,
  isFetchingUserSuccessful: false
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case LOAD_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetchingUSer: false,
        isFetchingUserSuccessful: true
      })
    case UPDATE_USER:
      return Object.assign({}, state, {
        userId: action.payload.user._id,
        fullName: action.payload.user.fullname,
      })
    default: return state;
  }
}