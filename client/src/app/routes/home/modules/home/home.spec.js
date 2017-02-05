import * as homeActions from './home';
import reducer from './home';

describe('home reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
        errorMessage: '',

        isFetchingHomeSuccessful: false,
        isFetchingHome: false,
        isFetching: false
      }
    )
  })

  it('should handle LOAD_HOME_REQUEST', () => {
    expect(
      reducer([], {
        type: 'LOAD_HOME_REQUEST'
      })
    ).toEqual({
        isFetching: true
      }
    )
  })

  it('should handle LOAD_HOME_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'LOAD_HOME_SUCCESS'
      })
    ).toEqual({
        isFetchingHomeSuccessful: true,
        isFetchingHome: false
      }
    )
  })

  it('should handle LOAD_HOME_FAIL', () => {
    expect(
      reducer([], {
        type: 'LOAD_HOME_FAIL',
        payload: {
          error : 'Loading home failed'
        }
      })
    ).toEqual({
        errorMessage: 'Loading home failed'
      }
    )
  })
})