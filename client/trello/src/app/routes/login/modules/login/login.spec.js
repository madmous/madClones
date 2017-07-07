import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from "nock";

import { trelloUrl, usersUrl } from "../../../../../utils/url";

import * as loginActions from "./login";
import reducer from "./login";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("login actions", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("should create authenticateUser action", () => {
    const expectedAction = {
      type: "AUTHENTICATE_USER"
    };

    expect(loginActions.authenticateUser()).toEqual(expectedAction);
  });

  it("should create an action to authenticate - success", () => {
    const formInputs = {
      username: "username",
      password: "password"
    };

    const redirectUrl = {
      query: {}
    };

    const data = {
      csrf: "csrf"
    };

    const expectedActions = [
      { type: "AUTHENTICATION_REQUEST" },
      { type: "AUTHENTICATION_SUCCESS" },
      {
        type: "@@router/CALL_HISTORY_METHOD",
        payload: {
          args: ["/"],
          method: "push"
        }
      }
    ];

    const store = mockStore();

    nock(`${trelloUrl}api/signin`, {
      reqheaders: {
        "Content-Type": "application/json; charset=utf-8",
        authorization:
          "Basic " + btoa(formInputs.username + ":" + formInputs.password)
      }
    })
      .post("")
      .reply(200, { data });

    return store
      .dispatch(loginActions.authenticate(formInputs, redirectUrl))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("should create an action to authenticate - fail", () => {
    const formInputs = {
      username: "username",
      password: "password"
    };

    const redirectUrl = {
      query: {}
    };

    const data = {
      error: {
        usernameErr: "Username error",
        passwordErr: "Password error"
      }
    };

    const expectedActions = [
      { type: "AUTHENTICATION_REQUEST" },
      {
        type: "AUTHENTICATION_FAIL",
        payload: {
          error: data.error 
        }
      },
      {
        type: "@@redux-form/CHANGE",
        payload: "",
        meta: {
          field: "username",
          form: "loginForm",
          persistentSubmitErrors: undefined,
          touch: undefined
        }
      },
      {
        type: "@@redux-form/CHANGE",
        payload: "",
        meta: {
          field: "password",
          form: "loginForm",
          persistentSubmitErrors: undefined,
          touch: undefined
        }
      }
    ];

    const store = mockStore();

    nock(`${trelloUrl}api/signin`, {
      reqheaders: {
        "Content-Type": "application/json; charset=utf-8",
        authorization:
          "Basic " + btoa(formInputs.username + ":" + formInputs.password)
      }
    })
      .post("")
      .reply(400, { data });

    return store
      .dispatch(loginActions.authenticate(formInputs, redirectUrl))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("should create an action to logoutUser", () => {
    const expectedActions = [{ type: "CLOSE_ALL_MODALS" }];

    const store = mockStore();

    store.dispatch(loginActions.logoutUser());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe("login reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthenticatingSuccessful: false,
      isAuthenticating: false,
      isAuthenticated: false,

      errorMessage: {}
    });
  });

  it("should handle AUTHENTICATION_REQUEST", () => {
    expect(
      reducer([], {
        type: "AUTHENTICATION_REQUEST"
      })
    ).toEqual({
      isAuthenticating: true,
      errorMessage: {}
    });
  });

  it("should handle AUTHENTICATION_SUCCESS", () => {
    expect(
      reducer([], {
        type: "AUTHENTICATION_SUCCESS"
      })
    ).toEqual({
      isAuthenticatingSuccessful: true,
      isAuthenticating: false,
      isAuthenticated: true
    });
  });

  it("should handle AUTHENTICATION_FAIL", () => {
    const payload = {
      error: {
        usernameErr: "Please enter a username",
        passwordErr: "Please enter a password"
      }
    };

    expect(
      reducer([], {
        type: "AUTHENTICATION_FAIL",
        payload
      })
    ).toEqual({
      isAuthenticatingSuccessful: false,
      isAuthenticating: false,
      isAuthenticated: false,

      errorMessage: payload.error
    });
  });

  it("should handle AUTHENTICATE_USER", () => {
    expect(
      reducer([], {
        type: "AUTHENTICATE_USER"
      })
    ).toEqual({
      isAuthenticated: true
    });
  });

  it("should handle UN_AUTHENTICATE_USER", () => {
    expect(
      reducer([], {
        type: "UN_AUTHENTICATE_USER"
      })
    ).toEqual({
      isAuthenticated: false
    });
  });
});
