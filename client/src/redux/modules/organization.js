import fetch from 'isomorphic-fetch'

import { updateNotification, hideNotification } from './notification'
import { closeAllModals } from './modals'

export const UPDATE_ORGANIZATIONS = 'UPDATE_ORGANIZATIONS'

export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

export const ADD_ORGANIZATION_REQUEST = 'ADD_ORGANIZATION_REQUEST'
export const ADD_ORGANIZATION_SUCCESS = 'ADD_ORGANIZATION_SUCCESS'
export const ADD_ORGANIZATION_FAIL = 'ADD_ORGANIZATION_FAIL'

export function updateOrganizations(payload) {
  return {
		type: UPDATE_ORGANIZATIONS,
		payload
	}
}

export function addOrganizationRequest() {
  return {
		type: ADD_ORGANIZATION_REQUEST
	}
}

export function addOrganizationSuccess() {
  return {
		type: ADD_ORGANIZATION_SUCCESS
	}
}

export function addOrganizationFail(payload) {
  return {
		type: ADD_ORGANIZATION_FAIL,
    payload
	}
}

export function openModal(payload) {
  return {
		type: OPEN_MODAL,
		payload
	}
}

export function closeModal(payload) {
  return {
		type: CLOSE_MODAL,
		payload
	}
}

export function addOrganization(userId, organizationName) {
  return saveOrganization(`http://localhost:3001/api/v1/users/${userId}/organizations`, organizationName);
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
          'Content-Type': 'application/json; charset=utf-8'
        },
      })
      .then(response => response.json())
      .then(json => {
        const jsonData = json.data;

        if (jsonData.uiError || jsonData.error) {
          dispatch(addOrganizationFail(jsonData));
          dispatch(updateNotification(jsonData.uiError));

          setTimeout(() => {
            dispatch(hideNotification())
          }, 3000)
        } else {
          dispatch(closeAllModals());
          dispatch(addOrganizationSuccess());
          dispatch(updateOrganizations(jsonData));
        }
      })
  }
}

const initialState = {
  isOrganizationFetching: false,
  isOrganizationFetchingSuccessful: false,
  errorMessage: '',

  isModalOpen: false,

  organizations:[]
}

export default function organization(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ORGANIZATIONS:
      return Object.assign({}, state, {
        organizations: action.payload.organizations
      })
    case ADD_ORGANIZATION_SUCCESS:
      return Object.assign({}, state, {
        isOrganizationFetchingSuccessful: true,
        isOrganizationFetching: false
      })
    case ADD_ORGANIZATION_FAIL:
      return Object.assign({}, state, {
        isOrganizationFetchingSuccessful: false,
        isOrganizationFetching: false,
        errorMessage: action.payload.error
      })
    case OPEN_MODAL:
			return Object.assign({}, state, {
				isModalOpen: action.payload.isModalOpen
			})
    case CLOSE_MODAL:
			return Object.assign({}, state, {
				isModalOpen: action.payload.isModalOpen
			})
    default: return state;
  }
}