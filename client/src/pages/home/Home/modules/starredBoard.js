import { updateOrganizations } from './organization'
import { updateNotification } from './notification'
import { updateBoards } from './board'

import { url } from '../../../../utils/url';

const UPDATE_STARRED_BOARDS = 'UPDATE_STARRED_BOARDS'

const STAR_BOARD_REQUEST = 'STAR_BOARD_REQUEST'
const STAR_BOARD_SUCCESS = 'STAR_BOARD_SUCCESS'
const STAR_BOARD_FAIL = 'STAR_BOARD_FAIL'

const UNSTAR_BOARD_REQUEST = 'UNSTAR_BOARD_REQUEST'
const UNSTAR_BOARD_SUCCESS = 'UNSTAR_BOARD_SUCCESS'
const UNSTAR_BOARD_FAIL = 'UNSTAR_BOARD_FAIL'

export function updateStarredBoards(payload) {
  return {
		type: UPDATE_STARRED_BOARDS,
		payload
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

export function addBoardStar(userId, orgId, boardId) {

  if (orgId === '') {
    return saveBoardStar(url + `api/v1/boards/${boardId}/boardstars`, 'POST');
  }

  return saveBoardStar(url + `api/v1/organizations/${orgId}/boards/${boardId}/boardstars`, 'POST');
}

export function removeBoardStar(userId, orgId, boardId) {
  if (orgId === '') {
    return saveBoardStar(url + `api/v1/boards/${boardId}/boardstars`, 'DELETE');
  }

  return saveBoardStar(url + `api/v1/organizations/${orgId}/boards/${boardId}/boardstars`, 'DELETE');  
}

function saveBoardStar(urlToFetch, method) {

  return dispatch => {

    if (method === 'POST') {
      dispatch(starBoardRequest());
    } else if (method === 'DELETE') {
      dispatch(unstarBoardRequest());
    }

    return fetch(urlToFetch, 
      { method: method, 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'Authorization': 'JWT ' + localStorage.getItem('userId')
        },
      })
      .then(response => response.json())
      .then(json => {
        const jsonData = json.data;
        const jsonDataError = jsonData.error;

        if (method === 'POST') {

          if (jsonDataError) {
            dispatch(starBoardFail(jsonData));
            dispatch(updateNotification(jsonDataError));
          } else {
            dispatch(starBoardSuccess());
          }
        } else if (method === 'DELETE') {

          if (jsonDataError) {
            dispatch(unstarBoardFail(jsonData));
            dispatch(updateNotification(jsonDataError));
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

const initialState = {
  isFetchingStarredBoard: false,
  isFetchingStarredBoardSuccessful: false,

  errorMessage: '',
  starredBoards: [],
}

export default function starredBoard(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STARRED_BOARDS:
      return Object.assign({}, state, {
        starredBoards: action.payload.starredBoards
      })
    case STAR_BOARD_REQUEST:
      return Object.assign({}, state, {
        isFetchingStarredBoard: true,
      })
    case STAR_BOARD_SUCCESS:
      return Object.assign({}, state, {
        isFetchingStarredBoardSuccessful: true,
        isFetchingStarredBoard: false
      })
    case STAR_BOARD_FAIL:
      return Object.assign({}, state, {
        isFetchingStarredBoardSuccessful: false,
        isFetchingStarredBoard: false
      })
    case UNSTAR_BOARD_REQUEST:
      return Object.assign({}, state, {
        isFetchingStarredBoard: true,
      })
    case UNSTAR_BOARD_SUCCESS:
      return Object.assign({}, state, {
        isFetchingStarredBoardSuccessful: true,
        isFetchingStarredBoard: false
      })
    case UNSTAR_BOARD_FAIL:
      return Object.assign({}, state, {
        isFetchingStarredBoardSuccessful: false,
        isFetchingStarredBoard: false,
        errorMessage: action.payload.error
      })
    default: return state;
  }
}