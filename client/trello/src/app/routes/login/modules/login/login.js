import { change } from 'redux-form';
import { push } from 'react-router-redux';
import fetch from 'isomorphic-fetch';

import { trelloUrl, usersUrl } from '../../../../../utils/url';

import { modalActionCreators } from '../../../home/modules/index';

const AUTHENTICATION_REQUEST = 'AUTHENTICATION_REQUEST';
const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
const AUTHENTICATION_FAIL = 'AUTHENTICATION_FAIL';

const UN_AUTHENTICATE_USER = 'UN_AUTHENTICATE_USER';
const AUTHENTICATE_USER = 'AUTHENTICATE_USER';

function authenticationRequest() {
  return {
    type: AUTHENTICATION_REQUEST
  };
}

function authenticationSuccess() {
  return {
    type: AUTHENTICATION_SUCCESS
  };
}

function authenticationFail(payload) {
  return {
    type: AUTHENTICATION_FAIL,
    payload
  };
}

export function authenticateUser() {
  return {
    type: AUTHENTICATE_USER
  };
}

export function authenticateIfNeeded() {
  return dispatch => {
    dispatch(authenticateUser());
  };
}

export function authenticate(formInputs, redirectUrl) {
  return dispatch => {
    dispatch(authenticationRequest());

    return fetch(`${trelloUrl}api/signin`, 
      { method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'Basic ' + btoa(formInputs.username + ':' + formInputs.password)
        },
        credentials: 'include'
      })
      .then(response => response.json())
      .then(json => {
        const jsonData = json.data;

        if (jsonData.error) {
          dispatch(authenticationFail(jsonData));

          if (jsonData.error.usernameErr) {
            dispatch(change('loginForm', 'username', ''))
          }
          
          if (jsonData.error.passwordErr) {
            dispatch(change('loginForm', 'password', ''))
          }

        } else {
          dispatch(authenticationSuccess());

          localStorage.setItem('csrf', jsonData.csrf);
          
          if (redirectUrl && redirectUrl.query && redirectUrl.query.redirect) {
            dispatch(push(redirectUrl.query.redirect))
          } else {
            dispatch(push('/'));
          }
        }
      }
    );
  };
}

function unAuthenticateUser() {
  return {
    type: UN_AUTHENTICATE_USER
  };
}

export function logoutUser() {
  return dispatch => {
    dispatch(modalActionCreators.closeAllModals());

    return fetch(`${usersUrl}api/signout`, 
      { method: 'GET',
        credentials: 'include'
      })
      .then(response => {
        localStorage.removeItem('csrf');

        dispatch(unAuthenticateUser());
        dispatch(push('/login'));
      });
  };
}

const initialState = {
  isAuthenticatingSuccessful: false,
  isAuthenticating : false,
  isAuthenticated: false,

  errorMessage: {}
}

export default function login(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATION_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true,
        errorMessage: {}
      });
    case AUTHENTICATION_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticatingSuccessful: true,
        isAuthenticating: false,
        isAuthenticated: true
      });
    case AUTHENTICATION_FAIL:
      return Object.assign({}, state, {
        isAuthenticatingSuccessful: false,
        isAuthenticating: false,
        isAuthenticated: false,

        errorMessage: action.payload.error
      });
    case AUTHENTICATE_USER:
      return Object.assign({}, state, {
        isAuthenticated: true
      });
    case UN_AUTHENTICATE_USER:
      return Object.assign({}, state, {
        isAuthenticated: false
      });
    default: return state;
  }
}