import fetch from 'isomorphic-fetch';
import { change } from 'redux-form';

import { loginActionCreators } from '../../../login/modules/index';
import { push } from 'react-router-redux';

import { usersUrl } from '../../../../../utils/url';

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

function signUpFail(payload) {
  return {
    type: SIGN_UP_FAIL,
    payload
  };
}

export function createUser(formInput) {
  return dispatch => {
    dispatch(signUpRequest())

    return fetch(`${usersUrl}api/signup`, 
      { method: 'POST',
        body: JSON.stringify({
          name: formInput.username,
          fullname: formInput.fullname,
          initials: formInput.initials,
          email: formInput.email,
          password: formInput.password,
          application: 'trello-clone'
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include'
      })
      .then(response => response.json())
      .then(json => {
        const jsonData = json.data;

        if (jsonData.uiError || jsonData.error) {
          dispatch(signUpFail(jsonData));

          if (jsonData.uiError.missingUsername) {
            dispatch(change('signUpForm', 'username', ''))
          }

          if (jsonData.uiError.missingFullname) {
            dispatch(change('signUpForm', 'fullname', ''))
          }
          
          if (jsonData.uiError.missingEmail) {
            dispatch(change('signUpForm', 'email', ''))
          }

        } else {
          dispatch(signUpSuccess());
          dispatch(loginActionCreators.authenticateUser());

          localStorage.setItem('csrf', jsonData.csrf);

          dispatch(push('/'));
        }
      }
    );
  };
}

const initialState = {
  isFetchingSuccessful: false,
  isFetching: false,

  errorMessage: {}
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
        isFetching: false,

        errorMessage: action.payload.uiError
      })
    default: return state;
  }
}