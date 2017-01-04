import fetch from 'isomorphic-fetch'

import { push } from 'react-router-redux';

import { updateOrganizations } from './organization'
import { updateStarredBoards } from './starredBoard'
import { closeAllModals } from './modals'
import { updateBoards } from './board'
import { updateUser } from './user'

export const AUTHENTICATION_REQUEST = 'AUTHENTICATION_REQUEST'
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAIL = 'SIGN_UP_FAIL'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'

function authenticationRequest() {
  return {
    type: AUTHENTICATION_REQUEST
  }
}

function authenticationSuccess() {
  return {
    type: AUTHENTICATION_SUCCESS
  }
}

function signUpRequest() {
  return {
    type: SIGN_UP_REQUEST
  }
}

function signUpSuccess() {
  return {
    type: SIGN_UP_SUCCESS
  }
}

function signUpFail(payload) {
  return {
    type: SIGN_UP_FAIL,
    payload
  }
}

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

export function authenticate(username, password) {
  return dispatch => {
    dispatch(authenticationRequest())

    return fetch(`http://localhost:3001/api/v1/login`, 
      { method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'Basic ' + btoa(username + ':' + password)
        },
      })
      .then(response => response.json())
      .then(json => {
        const payload = json.data;

        dispatch(authenticationSuccess());

        localStorage.setItem('userId', payload.token);

        dispatch(push('/'));
      })
  }
}

export function signUp(formInput) {
  return dispatch => {
    dispatch(signUpRequest())

    return fetch(`http://localhost:3001/api/v1/signup`, 
      { method: 'POST',
        body: JSON.stringify({
          name: formInput.username,
          fullname: formInput.username,
          initials: formInput.initials,
          email: formInput.email,
          password: formInput.password,
        }),
       headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then(response => response.json())
      .then(json => {
        const jsonData = json.data;

        if (jsonData.uiError || jsonData.error) {
          dispatch(signUpFail(jsonData.error));
        } else {
          dispatch(signUpSuccess());

          localStorage.setItem('userId', jsonData.token);

          dispatch(push('/'));
        }
      })
  }
}

export function getUser() {
  return dispatch => {
    dispatch(loadUserRequest())

    return fetch(`http://localhost:3001/api/v1/users/`, 
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
  isAuthenticatingSuccessful: false,
  isFetchingSuccessful: false,
  isAuthenticating : false,
  isAuthenticated: false,
  isFetching: false,

  errorMessage: '',
}

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATION_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true,
      })
    case AUTHENTICATION_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticatingSuccessful: true,
        isAuthenticated: true
      })
    case SIGN_UP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case SIGN_UP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetchingSuccessful: true,
        isAuthenticated: true
      })
    case SIGN_UP_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        isFetchingSuccessful: true,
        errorMessage: action.payload.error
      })
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