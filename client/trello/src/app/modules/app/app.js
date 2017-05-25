import fetch from 'isomorphic-fetch';

import { loginActionCreators } from '../../routes/login/modules/index';

import { trelloUrl } from '../../../utils/url';

const UPDATE_USER = 'UPDATE_USER';

const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
const LOAD_USER_FAIL = 'LOAD_USER_FAIL';

function loadUserRequest() {
  return {
    type: LOAD_USER_REQUEST
  };
}

function loadUserSuccess() {
  return {
    type: LOAD_USER_SUCCESS
  };
}

function loadUserFail(payload) {
  return {
    type: LOAD_USER_FAIL,
    payload
  };
}

export function updateUser(payload) {
  return {
    type: UPDATE_USER,
    payload
  };
}

export function getUser() {
  return dispatch => {
    dispatch(loadUserRequest())

    return fetch(`${trelloUrl}api/users`, 
      { 
        method: 'GET',
        headers: {
          'csrf': localStorage.getItem('csrf')
        },
        credentials: 'include'
      })
      .then(response => {
        if (response.status === 401) {
          throw new Error ('401 error')
        } else {
          return response.json();
        }
      })
      .then(json => {
        const jsonData = json.data;

        if (jsonData.uiError || jsonData.error) {
          dispatch(loadUserFail(jsonData))
        } else {
          dispatch(loadUserSuccess())
          dispatch(updateUser(jsonData));
        }
      })
      .catch(error => dispatch(loginActionCreators.logoutUser()))
  };
}

const initialState = {
  errorMessage: '',
  fullName: '',
  userId: '',

  isFetchingUserSuccessful: false,
  isFetchingUser: false
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case LOAD_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetchingUserSuccessful: true,
        isFetchingUser: false
      });
    case LOAD_USER_FAIL:
      return Object.assign({}, state, {
        isFetchingUserSuccessful: false,
        isFetchingUser: false,

        errorMessage: action.payload.error
      });
    case UPDATE_USER:
      return Object.assign({}, state, {
        userId: action.payload._id,
        fullName: action.payload.fullname,
      });
    default: return state;
  }
}