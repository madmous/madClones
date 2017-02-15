import fetch from 'isomorphic-fetch';

import { 
  organizationActionCreators, 
  notificationActionCreators,
  modalActionCreators
} from '../index';

import { url } from '../../../../../utils/url.js';

const CLOSE_MODAL = 'CLOSE_MODAL';
const OPEN_MODAL = 'OPEN_MODAL';

const UPDATE_BOARDS = 'UPDATE_BOARDS';

const ADD_BOARD_REQUEST = 'ADD_BOARD_REQUEST';
const ADD_BOARD_SUCCESS = 'ADD_BOARD_SUCCESS';
const ADD_BOARD_FAIL = 'ADD_BOARD_FAIL';

const CLOSE_BOARDS_MENU = 'CLOSE_BOARDS_MENU';
const OPEN_BOARDS_MENU = 'OPEN_BOARDS_MENU';

const initialState = {
  isFetchingBoardSuccessful: false,
  isBoardsMenuOpen: false,
  isFetchingBoard: false,
  isModalOpen: false,

  errorMessage: '',

  boards:[]
};

function addBoardRequest() {
  return {
    type: ADD_BOARD_REQUEST
  };
}

function addBoardSuccess() {
  return {
    type: ADD_BOARD_SUCCESS
  };
}

function addBoardFail(payload) {
  return {
    type: ADD_BOARD_FAIL,
    payload
  };
}

export function updateBoards(payload) {
  return {
		type: UPDATE_BOARDS,
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

export function openBoardsMenu() {
  return {
		type: OPEN_BOARDS_MENU
	};
}

export function closeBoardsMenu() {
  return {
		type: CLOSE_BOARDS_MENU
	};
}

export function addBoard(userId, orgId, boardName) {

  if (orgId) {
    return saveBoard(url + `api/v1/organizations/${orgId}/boards`, boardName);
  }

  return saveBoard(url + `api/v1/boards`, boardName);
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
          dispatch(notificationActionCreators.updateNotification(jsonData.uiError));

          setTimeout(() => {
            dispatch(notificationActionCreators.hideNotification())
          }, 3000)
        } else {
          dispatch(modalActionCreators.closeAllModals());
          dispatch(addBoardSuccess());
          dispatch(updateBoards(jsonData));
          dispatch(organizationActionCreators.updateOrganizations(jsonData));
        }
      }
    );
  };
}

export default function board(state = initialState, action) {
  switch (action.type) {
    case ADD_BOARD_REQUEST:
      return Object.assign({}, state, {
        isFetchingBoard: true,
      });
    case ADD_BOARD_SUCCESS:
      return Object.assign({}, state, {
        isFetchingBoardSuccessful: true,
        isFetchingBoard: false
      });
    case ADD_BOARD_FAIL:
      return Object.assign({}, state, {
        isFetchingBoardSuccessful: false,
        isFetchingBoard: false,
        errorMessage: action.payload.error
      });
		case UPDATE_BOARDS:
			return Object.assign({}, state, {
				boards: action.payload.boards
			});
    case OPEN_MODAL:
			return Object.assign({}, state, {
				isModalOpen: true
			});
    case CLOSE_MODAL:
			return Object.assign({}, state, {
				isModalOpen: false
			});
    case OPEN_BOARDS_MENU:
			return Object.assign({}, state, {
				isBoardsMenuOpen: true
			});
    case CLOSE_BOARDS_MENU:
			return Object.assign({}, state, {
				isBoardsMenuOpen: false
			});
    default: return state;
  }
}