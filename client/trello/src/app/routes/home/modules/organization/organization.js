import fetch from 'isomorphic-fetch';

import {
  notificationActionCreators, 
  modalActionCreators 
} from '../index';

import { trelloUrl } from '../../../../../utils/url';

const UPDATE_ORGANIZATIONS = 'UPDATE_ORGANIZATIONS';

const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

const ADD_ORGANIZATION_REQUEST = 'ADD_ORGANIZATION_REQUEST';
const ADD_ORGANIZATION_SUCCESS = 'ADD_ORGANIZATION_SUCCESS';
const ADD_ORGANIZATION_FAIL = 'ADD_ORGANIZATION_FAIL';

export function updateOrganizations(payload) {
  return {
		type: UPDATE_ORGANIZATIONS,
		payload
	};
}

export function addOrganizationRequest() {
  return {
		type: ADD_ORGANIZATION_REQUEST
	};
}

export function addOrganizationSuccess() {
  return {
		type: ADD_ORGANIZATION_SUCCESS
	};
}

export function addOrganizationFail(payload) {
  return {
		type: ADD_ORGANIZATION_FAIL,
    payload
	};
}

export function openModal() {
  return {
		type: OPEN_MODAL
	};
}

export function closeModal() {
  return {
		type: CLOSE_MODAL
	};
}

export function addOrganization(userId, organizationName) {
  return saveOrganization(`${trelloUrl}api/organizations`, organizationName);
}

function saveOrganization(url, organizationName) {
  return dispatch => {
    dispatch(addOrganizationRequest())

    return fetch(url, 
      { method: 'POST', 
        body: JSON.stringify({
          name: organizationName,
          displayName: organizationName,
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'csrf': localStorage.getItem('csrf')
        },
        credentials: 'include'
      })
      .then(response => response.json())
      .then(json => {
        const jsonData = json.data;

        if (jsonData.uiError || jsonData.error) {
          dispatch(addOrganizationFail(jsonData));
          dispatch(notificationActionCreators.updateNotification(jsonData.uiError));

          setTimeout(() => {
            dispatch(notificationActionCreators.hideNotification())
          }, 3000)
        } else {
          dispatch(modalActionCreators.closeAllModals());
          dispatch(addOrganizationSuccess());
          dispatch(updateOrganizations(jsonData));
        }
      }
    );
  };
}

const initialState = {
  isFetchingOrganization: false,
  isFetchingOrganizationSuccessful: false,
  errorMessage: '',

  isModalOpen: false,

  organizations:[]
};

export default function organization(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ORGANIZATIONS:
      return Object.assign({}, state, {
        organizations: action.payload.organizations
      });
    case ADD_ORGANIZATION_SUCCESS:
      return Object.assign({}, state, {
        isFetchingOrganizationSuccessful: true,
        isFetchingOrganization: false
      });
    case ADD_ORGANIZATION_FAIL:
      return Object.assign({}, state, {
        isFetchingOrganizationSuccessful: false,
        isFetchingOrganization: false,
        errorMessage: action.payload.error
      });
    case OPEN_MODAL:
			return Object.assign({}, state, {
				isModalOpen: true
			});
    case CLOSE_MODAL:
			return Object.assign({}, state, {
				isModalOpen: false
			});
    default: return state;
  }
}