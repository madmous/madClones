import {
  organizationActionCreators,
  notificationActionCreators,
  boardActionCreators
} from "../index";

import { trelloUrl } from "../../../../../utils/url";
import request from "../../../../../utils/request";

const UPDATE_STARRED_BOARDS = "UPDATE_STARRED_BOARDS";

const STAR_BOARD_REQUEST = "STAR_BOARD_REQUEST";
const STAR_BOARD_SUCCESS = "STAR_BOARD_SUCCESS";
const STAR_BOARD_FAIL = "STAR_BOARD_FAIL";

const UNSTAR_BOARD_REQUEST = "UNSTAR_BOARD_REQUEST";
const UNSTAR_BOARD_SUCCESS = "UNSTAR_BOARD_SUCCESS";
const UNSTAR_BOARD_FAIL = "UNSTAR_BOARD_FAIL";

function starBoardRequest() {
  return {
    type: STAR_BOARD_REQUEST
  };
}

function starBoardSuccess() {
  return {
    type: STAR_BOARD_SUCCESS
  };
}

function starBoardFail(payload) {
  return {
    type: STAR_BOARD_FAIL,
    payload
  };
}

function unstarBoardRequest() {
  return {
    type: UNSTAR_BOARD_REQUEST
  };
}

function unstarBoardSuccess() {
  return {
    type: UNSTAR_BOARD_SUCCESS
  };
}

function unstarBoardFail(payload) {
  return {
    type: UNSTAR_BOARD_FAIL,
    payload
  };
}

export function updateStarredBoards(payload) {
  return {
    type: UPDATE_STARRED_BOARDS,
    payload
  };
}

export function addBoardStar(orgId, boardId) {
  if (orgId) {
    return saveBoardStar(
      `${trelloUrl}api/organizations/${orgId}/boards/${boardId}/boardstars`,
      "POST"
    );
  }

  return saveBoardStar(`${trelloUrl}api/boards/${boardId}/boardstars`, "POST");
}

export function removeBoardStar(orgId, boardId) {
  if (orgId) {
    return saveBoardStar(
      `${trelloUrl}api/organizations/${orgId}/boards/${boardId}/boardstars`,
      "DELETE"
    );
  }

  return saveBoardStar(
    `${trelloUrl}api/boards/${boardId}/boardstars`,
    "DELETE"
  );
}

function saveBoardStar(url, method) {
  return dispatch => {
    if (method === "POST") {
      dispatch(starBoardRequest());
    } else if (method === "DELETE") {
      dispatch(unstarBoardRequest());
    }

    return request(url, {
      method: method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        csrf: localStorage.getItem("csrf")
      },
      credentials: "include"
    }).then(
      response => {
        const responseData = response.data;

        if (method === "POST") {
          dispatch(starBoardSuccess());
        } else if (method === "DELETE") {
          dispatch(unstarBoardSuccess());
        }

        dispatch(boardActionCreators.updateBoards(responseData));
        dispatch(updateStarredBoards(responseData));
        dispatch(organizationActionCreators.updateOrganizations(responseData));
      },
      response => {
        const responseError = response.error;

        if (method === "POST") {
          dispatch(starBoardFail(response));
          dispatch(
            notificationActionCreators.updateNotification(responseError)
          );
        } else if (method === "DELETE") {
          dispatch(unstarBoardFail(response));
          dispatch(
            notificationActionCreators.updateNotification(responseError)
          );
        }
      }
    );
  };
}

const initialState = {
  isFetchingStarredBoard: false,
  isFetchingStarredBoardSuccessful: false,

  errorMessage: "",
  starredBoards: []
};

export default function starredBoard(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STARRED_BOARDS:
      return Object.assign({}, state, {
        starredBoards: action.payload.boardStars
      });
    case STAR_BOARD_REQUEST:
      return Object.assign({}, state, {
        isFetchingStarredBoard: true
      });
    case STAR_BOARD_SUCCESS:
      return Object.assign({}, state, {
        isFetchingStarredBoardSuccessful: true,
        isFetchingStarredBoard: false
      });
    case STAR_BOARD_FAIL:
      return Object.assign({}, state, {
        isFetchingStarredBoardSuccessful: false,
        isFetchingStarredBoard: false
      });
    case UNSTAR_BOARD_REQUEST:
      return Object.assign({}, state, {
        isFetchingStarredBoard: true
      });
    case UNSTAR_BOARD_SUCCESS:
      return Object.assign({}, state, {
        isFetchingStarredBoardSuccessful: true,
        isFetchingStarredBoard: false
      });
    case UNSTAR_BOARD_FAIL:
      return Object.assign({}, state, {
        isFetchingStarredBoardSuccessful: false,
        isFetchingStarredBoard: false,
        errorMessage: action.payload.error
      });
    default:
      return state;
  }
}
