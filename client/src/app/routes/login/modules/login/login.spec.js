import * as loginActions from './login';
import reducer from './login';

describe('login actions', () => {
  it('should create authenticateUser action', () => {
    const expectedAction = {
      type: 'AUTHENTICATE_USER'
    };

    expect(loginActions.authenticateUser()).toEqual(expectedAction)
  })

  it('should create authenticateIfNeeded action', () => {
    const expectedAction = {
      type: 'AUTHENTICATE_USER'
    };

    expect(loginActions.authenticateIfNeeded()).toEqual(expectedAction);
  })
})

describe('login reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
        isAuthenticatingSuccessful: false,
        isAuthenticating : false,
        isAuthenticated: false,

        errorMessage: {}
      }
    )
  })

  it('should handle AUTHENTICATION_REQUEST', () => {
    expect(
      reducer([], {
        type: 'AUTHENTICATION_REQUEST'
      })
    ).toEqual({
        isAuthenticating: true,
        errorMessage: {}
      }
    )
  })

  it('should handle AUTHENTICATION_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'AUTHENTICATION_SUCCESS'
      })
    ).toEqual({
        isAuthenticatingSuccessful: true,
        isAuthenticating: false,
        isAuthenticated: true
      }
    )
  })

  it('should handle AUTHENTICATION_FAIL', () => {
    const payload = {
      uiError: {
        usernameErr: 'Please enter a username',
        passwordErr: 'Please enter a password',
      }
    };

    expect(
      reducer([], {
        type: 'AUTHENTICATION_FAIL',
        payload
      })
    ).toEqual({
        isAuthenticatingSuccessful: false,
        isAuthenticating: false,
        isAuthenticated: false,

        errorMessage: payload.uiError
      }
    )
  })

  it('should handle AUTHENTICATE_USER', () => {
    expect(
      reducer([], {
        type: 'AUTHENTICATE_USER'
      })
    ).toEqual({
        isAuthenticated: true
      }
    )
  })

  it('should handle UN_AUTHENTICATE_USER', () => {
    expect(
      reducer([], {
        type: 'UN_AUTHENTICATE_USER'
      })
    ).toEqual({
        isAuthenticated: false
      }
    )
  })
})