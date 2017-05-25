import fetch from 'isomorphic-fetch';

import { 
  organizationActionCreators, 
  notificationActionCreators,
  modalActionCreators,
  formActionCreators
} from '../index';

import { trelloUrl } from '../../../../../utils/url.js';

const CLOSE_MODAL = 'CLOSE_MODAL';
const OPEN_MODAL = 'OPEN_MODAL';

const UPDATE_BOARDS = 'UPDATE_BOARDS';

const ADD_BOARD_REQUEST = 'ADD_BOARD_REQUEST';
const ADD_BOARD_SUCCESS = 'ADD_BOARD_SUCCESS';
const ADD_BOARD_FAIL = 'ADD_BOARD_FAIL';

const UPDATE_BOARD_NAME_REQUEST = 'UPDATE_BOARD_NAME_REQUEST';
const UPDATE_BOARD_NAME_SUCCESS = 'UPDATE_BOARD_NAME_SUCCESS';
const UPDATE_BOARD_NAME_FAIL = 'UPDATE_BOARD_NAME_FAIL';

const initialState = {
  isFetchingBoardSuccessful: false,
  isFetchingBoard: false,

  isUpdatingBoardNameSuccessful: false,
  isUpdatingBoardName: false,

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

function updateBoardNameRequest() {
  return {
    type: UPDATE_BOARD_NAME_REQUEST
  };
}

function updateBoardNameSuccess() {
  return {
    type: UPDATE_BOARD_NAME_SUCCESS
  };
}

function updateBoardNameFail(payload) {
  return {
    type: UPDATE_BOARD_NAME_FAIL,
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

export function addBoard(userId, orgId, boardName) {
  if (orgId) {
    return saveBoard(`${trelloUrl}api/organizations/${orgId}/boards`, boardName, 'POST');
  }

  return saveBoard(`${trelloUrl}api/boards`, boardName, 'POST');
}

export function updateBoardName(orgId, boardId, boardName) {
  if (orgId) {
    return saveBoard(`${trelloUrl}api/organizations/${orgId}/boards/${boardId}`, boardName, 'PUT');
  }

  return saveBoard(`${trelloUrl}api/boards/${boardId}`, boardName, 'PUT');
}

function saveBoard(url, boardName, methodType) {
  return dispatch => {
    if (methodType === 'POST') {
      dispatch(addBoardRequest());
    } else {
      dispatch(updateBoardNameRequest());
    }

    return fetch(url, 
      { method: methodType, 
        body: JSON.stringify({
          name: boardName
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
          if (methodType === 'POST') {
            dispatch(addBoardFail(jsonData));
            dispatch(notificationActionCreators.updateNotification(jsonData.uiError));

            setTimeout(() => {
              dispatch(notificationActionCreators.hideNotification())
            }, 3000)
          } else {
            dispatch(updateBoardNameFail(jsonData));
          }
        } else {
          dispatch(modalActionCreators.closeAllModals());
          dispatch(formActionCreators.closeAllForms());

          if (methodType === 'POST') {
            dispatch(addBoardSuccess());
          } else {
            dispatch(updateBoardNameSuccess());
          }
          
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
    case UPDATE_BOARD_NAME_REQUEST:
      return Object.assign({}, state, {
        isUpdatingBoardName: true,
      });
    case UPDATE_BOARD_NAME_SUCCESS:
      return Object.assign({}, state, {
        isUpdatingBoardNameSuccessful: true,
        isUpdatingBoardName: false
      });
    case UPDATE_BOARD_NAME_FAIL:
      return Object.assign({}, state, {
        isUpdatingBoardNameSuccessful: false,
        isUpdatingBoardName: false,
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
    default: return state;
  }
}