import * as boardActions from './board';
import reducer from './board';

describe('board actions', () => {
  it('should create update boards action', () => {
    const payload = {}; 
    const expectedAction = {
      type: 'UPDATE_BOARDS',
      payload
    };

    expect(boardActions.updateBoards(payload)).toEqual(expectedAction)
  })

  it('should create open modal action', () => {
    const expectedAction = {
      type: 'OPEN_MODAL'
    };

    expect(boardActions.openModal()).toEqual(expectedAction)
  })

  it('should create open modal action', () => {
    const expectedAction = {
      type: 'CLOSE_MODAL'
    };

    expect(boardActions.closeModal()).toEqual(expectedAction)
  })
})

describe('board reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
        isFetchingBoard: false,
        isFetchingBoardSuccessful: false,
        errorMessage: '',

        isModalOpen: false,

        boards:[]
      }
    )
  })

  it('should handle ADD_BOARD_REQUEST', () => {
    expect(
      reducer([], {
        type: 'ADD_BOARD_REQUEST'
      })
    ).toEqual({
        isFetchingBoard: true
      }
    )
  })

  it('should handle ADD_BOARD_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'ADD_BOARD_SUCCESS'
      })
    ).toEqual({
        isFetchingBoardSuccessful: true,
        isFetchingBoard: false
      }
    )
  })

  it('should handle ADD_BOARD_FAIL', () => {
    expect(
      reducer([], {
        type: 'ADD_BOARD_FAIL',
        payload: {
          error : 'Please enter a board name'
        }
      })
    ).toEqual({
        isFetchingBoardSuccessful: false,
        isFetchingBoard: false,
        errorMessage: 'Please enter a board name'
      }
    )
  })

  it('should handle UPDATE_BOARDS', () => {
    const payload = {
      boards: [{
        _id: '1',
        isStarredBoard: true,
        name: 'boardName'
      }]
    }; 

    expect(
      reducer([], {
        type: 'UPDATE_BOARDS',
        payload
      })
    ).toEqual({
        boards: payload.boards
      }
    )
  })

  it('should handle OPEN_MODAL', () => {
    const payload = {
      isModalOpen: true
    }; 

    expect(
      reducer([], {
        type: 'OPEN_MODAL'
      })
    ).toEqual({
        isModalOpen: true
      }
    )
  })

  it('should handle CLOSE_MODAL', () => {
    const payload = {
      isModalOpen: false
    }; 

    expect(
      reducer([], {
        type: 'CLOSE_MODAL'
      })
    ).toEqual({
        isModalOpen: false
      }
    )
  })
})