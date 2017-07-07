import {
  starredBoardActionCreators,
  organizationActionCreators,
  boardActionCreators,
  modalActionCreators
} from "../index";

import { cardActionCreators } from "../../routes/boardView/modules/index";
import { loginActionCreators } from "../../../login/modules/index";

import { trelloUrl } from "../../../../../utils/url";
import request from "../../../../../utils/request";

const LOAD_HOME_REQUEST = "LOAD_HOME_REQUEST";
const LOAD_HOME_SUCCESS = "LOAD_HOME_SUCCESS";
const LOAD_HOME_FAIL = "LOAD_HOME_FAIL";

const initialState = {
  errorMessage: "",

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
    dispatch(loadHomeRequest());

    return request(`${trelloUrl}api/home`, {
      method: "GET",
      headers: {
        csrf: localStorage.getItem("csrf")
      },
      credentials: "include"
    }).then(
      response => {
        const responseData = response.data;

        dispatch(modalActionCreators.closeAllModals());
        dispatch(loadHomeSuccess());

        dispatch(organizationActionCreators.updateOrganizations(responseData));
        dispatch(starredBoardActionCreators.updateStarredBoards(responseData));
        dispatch(boardActionCreators.updateBoards(responseData));
        dispatch(cardActionCreators.resetCards());
      },
      response => {
        dispatch(loadHomeFail(response));

        if (response.status === 401) {
          dispatch(loginActionCreators.logoutUser());
        }
      }
    );
  };
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOAD_HOME_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
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
    default:
      return state;
  }
}
