import { loginActionCreators } from "../../routes/login/modules/index";

import { trelloUrl } from "../../../utils/url";
import request from "../../../utils/request";

const UPDATE_USER = "UPDATE_USER";

const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
const LOAD_USER_FAIL = "LOAD_USER_FAIL";

function loadUserRequest() {
  return {
    type: LOAD_USER_REQUEST
  };
}

function loadUserSuccess() {
  return {
    type: LOAD_USER_SUCCESS
  };
}

function loadUserFail(payload) {
  return {
    type: LOAD_USER_FAIL,
    payload
  };
}

export function updateUser(payload) {
  return {
    type: UPDATE_USER,
    payload
  };
}

export function getUser() {
  return dispatch => {
    dispatch(loadUserRequest());

    const options = {
      method: "GET",
      headers: {
        csrf: localStorage.getItem("csrf")
      },
      credentials: "include"
    };

    return request(`${trelloUrl}api/users`, options).then(
      response => {
        dispatch(loadUserSuccess());
        dispatch(updateUser(response));
      },
      response => {
        dispatch(loadUserFail(response));

        if (response.status === 401) {
          dispatch(loginActionCreators.logoutUser());
        }
      }
    );
  };
}

const initialState = {
  errorMessage: "",
  fullName: "",
  userId: "",

  isFetchingUserSuccessful: false,
  isFetchingUser: false
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case LOAD_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetchingUserSuccessful: true,
        isFetchingUser: false
      });
    case LOAD_USER_FAIL:
      return Object.assign({}, state, {
        isFetchingUserSuccessful: false,
        isFetchingUser: false,

        errorMessage: action.payload.error
      });
    case UPDATE_USER:
      return Object.assign({}, state, {
        userId: action.payload._id,
        fullName: action.payload.fullname
      });
    default:
      return state;
  }
}
