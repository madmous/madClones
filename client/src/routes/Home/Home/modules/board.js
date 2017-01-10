import fetch from 'isomorphic-fetch'

import { updateOrganizations } from './organization'
import { updateNotification } from './notification'
import { hideNotification } from './notification'
import { closeAllModals } from './modals'

const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'

const UPDATE_BOARDS = 'UPDATE_BOARDS'

const ADD_BOARD_REQUEST = 'ADD_BOARD_REQUEST'
const ADD_BOARD_SUCCESS = 'ADD_BOARD_SUCCESS'
const ADD_BOARD_FAIL = 'ADD_BOARD_FAIL'

function addBoardRequest() {
  return {
    type: ADD_BOARD_REQUEST
  }
}

function addBoardSuccess() {
  return {
    type: ADD_BOARD_SUCCESS
  }
}

function addBoardFail(payload) {
  return {
    type: ADD_BOARD_FAIL,
    payload
  }
}

export function updateBoards(payload) {
  return {
		type: UPDATE_BOARDS,
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

export function addBoard(userId, orgId, boardName) {

  if (orgId) {
    return saveBoard(`api/v1/organizations/${orgId}/boards`, boardName);
  }

  return saveBoard(`api/v1/boards`, boardName);
}

function saveBoard(url, boardName) {
  return dispatch => {
    dispatch(addBoardRequest())

    return fetch(url, 
      { method: 'POST', 
        body: JSON.stringify({
          name: boardName
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'JWT ' + localStorage.getItem('userId')
        },
      })
      .then(response => response.json())
      .then(json => {
        const jsonData = json.data;

        if (jsonData.uiError || jsonData.error) {
          dispatch(addBoardFail(jsonData));
          dispatch(updateNotification(jsonData.uiError));

          setTimeout(() => {
            dispatch(hideNotification())
          }, 3000)
        } else {
          dispatch(closeAllModals());
          dispatch(addBoardSuccess());
          dispatch(updateBoards(jsonData));
          dispatch(updateOrganizations(jsonData));
        }
      })
  }
}

const initialState = {
  isFetchingBoard: false,
  isFetchingBoardSuccessful: false,
  errorMessage: '',

  isModalOpen: false,

  boards:[]
}

export default function board(state = initialState, action) {
  switch (action.type) {
    case ADD_BOARD_REQUEST:
      return Object.assign({}, state, {
        isFetchingBoard: true,
      })
    case ADD_BOARD_SUCCESS:
      return Object.assign({}, state, {
        isFetchingBoardSuccessful: true,
        isFetchingBoard: false
      })
    case ADD_BOARD_FAIL:
      return Object.assign({}, state, {
        isFetchingBoardSuccessful: false,
        isFetchingBoard: false,
        errorMessage: action.payload.error
      })
		case UPDATE_BOARDS:
			return Object.assign({}, state, {
				boards: action.payload.boards
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