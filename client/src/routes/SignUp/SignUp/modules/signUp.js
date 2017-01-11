import fetch from 'isomorphic-fetch'

import { authenticateUser } from '../../../Login/Login/modules/login'
import { push } from 'react-router-redux';

const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
const SIGN_UP_FAIL = 'SIGN_UP_FAIL'

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

export function createUser(formInput) {
  return dispatch => {
    dispatch(signUpRequest())

    return fetch(`api/v1/signup`, 
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
          dispatch(authenticateUser());

          localStorage.setItem('userId', jsonData.token);

          dispatch(push('/'));
        }
      })
  }
}

const initialState = {
  isFetchingSuccessful: false,
  isFetching: false,

  errorMessage: '',
}

export default function signUp(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case SIGN_UP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetchingSuccessful: true
      })
    case SIGN_UP_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        isFetchingSuccessful: true,
        errorMessage: action.payload.error
      })
    default: return state;
  }
}