import fetch from 'isomorphic-fetch';

import { 
  starredBoardActionCreators,
  organizationActionCreators,
  boardActionCreators,
  modalActionCreators,
} from '../index';

import { cardActionCreators } from '../../routes/boardView/modules/index';
import { loginActionCreators } from '../../../login/modules/index';

import { trelloUrl } from '../../../../../utils/url';

const LOAD_HOME_REQUEST = 'LOAD_HOME_REQUEST';
const LOAD_HOME_SUCCESS = 'LOAD_HOME_SUCCESS';
const LOAD_HOME_FAIL = 'LOAD_HOME_FAIL';

const initialState = {
  errorMessage: '',

  isFetchingHomeSuccessful: false,
  isFetchingHome: false,
  isFetching: false
};

function loadHomeRequest() {
  return {
    type: LOAD_HOME_REQUEST
  };
}

function loadHomeSuccess() {
  return {
    type: LOAD_HOME_SUCCESS
  };
}

function loadHomeFail(payload) {
  return {
    type: LOAD_HOME_FAIL,
    payload
  };
}

export function getHome() {
  return dispatch => {
    dispatch(loadHomeRequest())

    return fetch(`${trelloUrl}api/home`, 
      { method: 'GET',
        headers: {
          'csrf': localStorage.getItem('csrf')
        },
        credentials: 'include'
      })
      .then(response => {
        if (response.status === 401) {
          throw new Error('Error 401');
        } else {
          return response.json();
        }
      })
      .then(json => {
        const jsonData = json.data;

        if (jsonData.uiError || jsonData.error) {
          dispatch(loadHomeFail(jsonData))
        } else {
          dispatch(modalActionCreators.closeAllModals());
          dispatch(loadHomeSuccess());

          dispatch(organizationActionCreators.updateOrganizations(jsonData));
          dispatch(starredBoardActionCreators.updateStarredBoards(jsonData));
          dispatch(boardActionCreators.updateBoards(jsonData));
          dispatch(cardActionCreators.resetCards());
        }
      })
      .catch(error => dispatch(loginActionCreators.logoutUser()));
  };
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOAD_HOME_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case LOAD_HOME_SUCCESS:
      return Object.assign({}, state, {
        isFetchingHomeSuccessful: true,
        isFetchingHome: false
      });
    case LOAD_HOME_FAIL:
      return Object.assign({}, state, {
        errorMessage: action.payload.error
      });
    default: return state;
  }
}