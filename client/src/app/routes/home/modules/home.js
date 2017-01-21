import { updateOrganizations } from './organization'
import { updateStarredBoards } from './starredBoard'
import { closeAllModals } from './modals'
import { updateBoards } from './board'

import { url } from '../../../../utils/url';

const LOAD_HOME_REQUEST = 'LOAD_HOME_REQUEST';
const LOAD_HOME_SUCCESS = 'LOAD_HOME_SUCCESS';
const LOAD_HOME_FAIL = 'LOAD_HOME_FAIL';

function loadHomeRequest() {
  return {
    type: LOAD_HOME_REQUEST
  }
}

function loadHomeSuccess() {
  return {
    type: LOAD_HOME_SUCCESS
  }
}

function loadHomeFail(payload) {
  return {
    type: LOAD_HOME_FAIL,
    payload
  }
}

export function gethome() {
  return dispatch => {
    dispatch(loadHomeRequest())

    return fetch(url + `api/v1/users/`, 
      { method: 'GET',
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('userId')
        },
      })
      .then(response => response.json())
      .then(json => {
        const jsonData = json.data;

        if (jsonData.uiError || jsonData.error) {
          dispatch(loadHomeFail(jsonData))
        } else {
          dispatch(closeAllModals());
          dispatch(loadHomeSuccess());

          dispatch(updateOrganizations(jsonData))
          dispatch(updateStarredBoards(jsonData))
          dispatch(updateBoards(jsonData))
        }
      })
  }
}

const initialState = {
  errorMessage: '',

  isFetchingHomeSuccessful: false,
  isFetchingHome: false
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOAD_HOME_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case LOAD_HOME_SUCCESS:
      return Object.assign({}, state, {
        isFetchingHome: false,
        isFetchingHomeSuccessful: true
      })
    case LOAD_HOME_FAIL:
      return Object.assign({}, state, {
        errorMessage: action.payload.error
      })
    default: return state;
  }
}