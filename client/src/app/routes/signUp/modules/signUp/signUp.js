import fetch from 'isomorphic-fetch';
import { change } from 'redux-form';

import { loginActionCreators } from '../../../login/modules/index';
import { push } from 'react-router-redux';

import { url } from '../../../../../utils/url';

const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
const SIGN_UP_FAIL = 'SIGN_UP_FAIL'

function signUpRequest() {
  return {
    type: SIGN_UP_REQUEST
  };
}

function signUpSuccess() {
  return {
    type: SIGN_UP_SUCCESS
  };
}

function signUpFail() {
  return {
    type: SIGN_UP_FAIL
  };
}

export function createUser(formInput) {
  return dispatch => {
    dispatch(signUpRequest())

    return fetch(url + `api/v1/signup`, 
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
          dispatch(signUpFail());

          if (jsonData.uiError.usernameErr) {
            dispatch(change('signUpForm', 'username', ''))
          }
          
          if (jsonData.uiError.emailErr) {
            dispatch(change('signUpForm', 'email', ''))
          }

        } else {
          dispatch(signUpSuccess());
          dispatch(loginActionCreators.authenticateUser());

          localStorage.setItem('userId', jsonData.token);

          dispatch(push('/'));
        }
      }
    );
  };
}

const initialState = {
  isFetchingSuccessful: false,
  isFetching: false
}

export default function signUp(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case SIGN_UP_SUCCESS:
      return Object.assign({}, state, {
        isFetchingSuccessful: true,
        isFetching: false
      })
    case SIGN_UP_FAIL:
      return Object.assign({}, state, {
        isFetchingSuccessful: true,
        isFetching: false
      })
    default: return state;
  }
}