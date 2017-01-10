import fetch from 'isomorphic-fetch'

import { push } from 'react-router-redux';

const AUTHENTICATION_REQUEST = 'AUTHENTICATION_REQUEST'
const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS'

const AUTHENTICATE_USER = 'AUTHENTICATE_USER'

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

export function authenticateUser() {
  return {
    type: AUTHENTICATE_USER
  }
}

export function authenticateIfNeeded() {
  return dispatch => {
    dispatch(authenticateUser());
    dispatch(push('/'));
  }
}

export function authenticate(username, password) {
  return dispatch => {
    dispatch(authenticationRequest())

    return fetch(`api/v1/login`, 
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

const initialState = {
  isAuthenticatingSuccessful: false,
  isAuthenticating : false,
  isAuthenticated: false
}

export default function login(state = initialState, action) {
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
    case AUTHENTICATE_USER:
      return Object.assign({}, state, {
        isAuthenticated: true
      })
    default: return state;
  }
}