import * as signUpActions from './signUp';
import reducer from './signUp';

describe('signUp reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
        isFetchingSuccessful: false,
        isFetching: false,

        errorMessage: {}
      }
    )
  })

  it('should handle SIGN_UP_REQUEST', () => {
    const payload = {
      uiError: {
        usernameErr: 'Please enter a name',
        fullNameErr: 'Please enter a full name',
      }
    };

    expect(
      reducer([], {
        type: 'SIGN_UP_REQUEST'
      })
    ).toEqual({
        isFetching: true,

        errorMessage: payload.uiError
      }
    )
  })

  it('should handle SIGN_UP_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'SIGN_UP_SUCCESS'
      })
    ).toEqual({
        isFetchingSuccessful: true,
        isFetching: false
      }
    )
  })

  it('should handle SIGN_UP_FAIL', () => {
    const payload = {
      uiError: {
        usernameErr: 'Please enter a name',
        fullNameErr: 'Please enter a full name',
      }
    };
    
    expect(
      reducer([], {
        type: 'SIGN_UP_FAIL'
      })
    ).toEqual({
        isFetchingSuccessful: true,
        isFetching: false,

        errorMessage: payload
      }
    )
  })
})