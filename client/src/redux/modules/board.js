import fetch from 'isomorphic-fetch'

import { updateOrganizations } from './organization'
import { updateStarredBoards } from './starredBoard'

export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const UPDATE_BOARDS = 'UPDATE_BOARDS'

export const ADD_BOARD_REQUEST = 'ADD_BOARD_REQUEST'
export const ADD_BOARD_SUCCESS = 'ADD_BOARD_SUCCESS'

export const STAR_BOARD = 'STAR_BOARD'
export const UNSTAR_BOARD = 'UNSTAR_BOARD'

export const STAR_BOARD_REQUEST = 'STAR_BOARD_REQUEST'
export const STAR_BOARD_SUCCESS = 'STAR_BOARD_SUCCESS'
export const STAR_BOARD_FAIL = 'STAR_BOARD_FAIL'

export const UNSTAR_BOARD_REQUEST = 'UNSTAR_BOARD_REQUEST'
export const UNSTAR_BOARD_SUCCESS = 'UNSTAR_BOARD_SUCCESS'
export const UNSTAR_BOARD_FAIL = 'UNSTAR_BOARD_FAIL'

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

function starBoardRequest() {
  return {
    type: STAR_BOARD_REQUEST
  }
}

function starBoardSuccess() {
  return {
    type: STAR_BOARD_SUCCESS
  }
}

function starBoardFail(payload) {
  return {
    type: STAR_BOARD_FAIL,
    payload
  }
}

function unstarBoardRequest() {
  return {
    type: UNSTAR_BOARD_REQUEST
  }
}

function unstarBoardSuccess() {
  return {
    type: UNSTAR_BOARD_SUCCESS
  }
}

function unstarBoardFail(payload) {
  return {
    type: UNSTAR_BOARD_FAIL,
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

export function addBoardStar(userId, orgId, boardId) {

  if (orgId === '') {
    return saveBoardStar(`http://localhost:3001/api/v1/users/${userId}/boards/${boardId}/boardstars`, 'POST');
  }

  return saveBoardStar(`http://localhost:3001/api/v1/users/${userId}/organizations/${orgId}/boards/${boardId}/boardstars`, 'POST');
}

export function removeBoardStar(userId, orgId, boardId) {
  if (orgId === '') {
    return saveBoardStar(`http://localhost:3001/api/v1/users/${userId}/boards/${boardId}/boardstars`, 'DELETE');
  }

  return saveBoardStar(`http://localhost:3001/api/v1/users/${userId}/organizations/${orgId}/boards/${boardId}/boardstars`, 'DELETE');  
}

function saveBoardStar(url, method) {

  return dispatch => {

    if (method === 'POST') {
      dispatch(starBoardRequest());
    } else if (method === 'DELETE') {
      dispatch(unstarBoardRequest());
    }

    return fetch(url, 
      { method: method, 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
      })
      .then(response => response.json())
      .then(json => {
        const jsonData = json.data;

        if (method === 'POST') {

          if (jsonData.error) {
            dispatch(starBoardFail(jsonData));
          } else {
            dispatch(starBoardSuccess());
          }
        } else if (method === 'DELETE') {

          if (jsonData.error) {
            dispatch(unstarBoardFail(jsonData));
          } else {
            dispatch(unstarBoardSuccess());
          }
        }

        if (!jsonData.error) {
          dispatch(updateBoards(jsonData));
          dispatch(updateStarredBoards(jsonData));
          dispatch(updateOrganizations(jsonData));
        }
      }
    )
  }
}

export function addBoard(userId, orgId, boardName) {

  if (orgId) {
    return saveBoard(`http://localhost:3001/api/v1/users/${userId}/organizations/${orgId}/boards`, boardName);
  }

  return saveBoard(`http://localhost:3001/api/v1/users/${userId}/boards`, boardName);
}

function saveBoard(url, boardName) {
  return dispatch => {
    dispatch(addBoardRequest())

    return fetch(url, 
      { method: 'POST', 
        body: 'name=' + boardName,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
      })
      .then(response => response.json())
      .then(json => {
        const jsonData = json.data;

        dispatch(addBoardSuccess());
        dispatch(updateBoards(jsonData));
        dispatch(updateOrganizations(jsonData));
      })
  }
}

const initialState = {
  isBoardFetching: false,
  isBoardFetchingSuccessful: false,
  errorMessage: '',

  isModalOpen: false,

  boards:[]
}

export default function board(state = initialState, action) {
  switch (action.type) {
    case ADD_BOARD_REQUEST:
      return Object.assign({}, state, {
        isBoardFetching: true,
      })
    case ADD_BOARD_SUCCESS:
      return Object.assign({}, state, {
        isBoardFetchingSuccessful: true,
        isBoardFetching: false
      })
    case STAR_BOARD_REQUEST:
      return Object.assign({}, state, {
        isBoardFetching: true,
      })
    case STAR_BOARD_SUCCESS:
      return Object.assign({}, state, {
        isBoardFetchingSuccessful: true,
        isBoardFetching: false
      })
    case STAR_BOARD_FAIL:
      return Object.assign({}, state, {
        isBoardFetchingSuccessful: false,
        isBoardFetching: false
      })
    case UNSTAR_BOARD_REQUEST:
      return Object.assign({}, state, {
        isBoardFetching: true,
      })
    case UNSTAR_BOARD_SUCCESS:
      return Object.assign({}, state, {
        isBoardFetchingSuccessful: true,
        isBoardFetching: false
      })
    case UNSTAR_BOARD_FAIL:
      return Object.assign({}, state, {
        isBoardFetchingSuccessful: false,
        isBoardFetching: false,
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