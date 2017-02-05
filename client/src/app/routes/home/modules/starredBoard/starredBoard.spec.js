import * as starredBoardActions from './starredBoard';
import reducer from './starredBoard';

describe('starredBoard reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
        isFetchingStarredBoard: false,
        isFetchingStarredBoardSuccessful: false,

        errorMessage: '',
        starredBoards: []
      }
    )
  })

  it('should handle UPDATE_STARRED_BOARDS', () => {
    const payload = {
      starredBoards: [{
        _id: '1',
        id: '2',
        isStarredBoard: true,
        name: 'starredBoardName'
      }]
    };

    expect(
      reducer([], {
        type: 'UPDATE_STARRED_BOARDS',
        payload
      })
    ).toEqual({
        starredBoards: payload.starredBoards
      }
    )
  })

  it('should handle STAR_BOARD_REQUEST', () => {
    expect(
      reducer([], {
        type: 'STAR_BOARD_REQUEST'
      })
    ).toEqual({
        isFetchingStarredBoard: true
      }
    )
  })

  it('should handle STAR_BOARD_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'STAR_BOARD_SUCCESS'
      })
    ).toEqual({
        isFetchingStarredBoardSuccessful: true,
        isFetchingStarredBoard: false
      }
    )
  })

  it('should handle STAR_BOARD_FAIL', () => {
    expect(
      reducer([], {
        type: 'STAR_BOARD_FAIL'
      })
    ).toEqual({
        isFetchingStarredBoardSuccessful: false,
        isFetchingStarredBoard: false
      }
    )
  })

  it('should handle UNSTAR_BOARD_REQUEST', () => {
    expect(
      reducer([], {
        type: 'UNSTAR_BOARD_REQUEST'
      })
    ).toEqual({
        isFetchingStarredBoard: true
      }
    )
  })

  it('should handle UNSTAR_BOARD_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'UNSTAR_BOARD_SUCCESS'
      })
    ).toEqual({
        isFetchingStarredBoardSuccessful: true,
        isFetchingStarredBoard: false
      }
    )
  })

  it('should handle UNSTAR_BOARD_FAIL', () => {
    const payload = {
      errorMessage: 'Unstar board request failed'
    };

    expect(
      reducer([], {
        type: 'UNSTAR_BOARD_FAIL',
        payload
      })
    ).toEqual({
        isFetchingStarredBoardSuccessful: false,
        isFetchingStarredBoard: false,
        errorMessage: payload.error
      }
    )
  })
})