import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as starredBoardActions from './starredBoard';

import reducer from './starredBoard';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('starredBoard actions', () => {
  afterEach(() => {
    nock.cleanAll();
  })

  xit('should create an action to addBoardStar when the orgId is null', () => {
    const data = {
      organizations: [],
      starredBoards: [],
      boards: []
    };

    const expectedActions = [
      { type: 'STAR_BOARD_REQUEST' },
      { type: 'STAR_BOARD_SUCCESS' },
      { 
        type: 'UPDATE_BOARDS',
        payload: data 
      },
      { 
        type: 'UPDATE_STARRED_BOARDS',
        payload: data 
      },
      {
		    type: 'UPDATE_ORGANIZATIONS',
        payload: data
      }
    ];

    const store = mockStore();

    nock('http://localhost:3001/api/v1/boards/boardId/boardstars', { 
      reqheaders: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'authorization': 'JWT ' + localStorage.getItem('userId')
      }
    })
    .post('')
    .reply(200, { data });

    return store.dispatch(starredBoardActions.addBoardStar(null, 'boardId'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }
    );
  })

  xit('should create an action to addBoardStar', () => {
    const data = {
      organizations: [],
      starredBoard: [],
      boards: []
    };

    const expectedActions = [
      { type: 'STAR_BOARD_REQUEST' },
      { type: 'STAR_BOARD_SUCCESS' },
      { 
        type: 'UPDATE_BOARDS',
        payload: data 
      },
      { 
        type: 'UPDATE_STARRED_BOARDS',
        payload: data 
      },
      {
		    type: 'UPDATE_ORGANIZATIONS',
        payload: data
      }
    ];
    
    const store = mockStore();

    nock('http://localhost:3001/api/v1/organizations/orgId/boards/boardId/boardstars', { 
      reqheaders: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'authorization': 'JWT ' + localStorage.getItem('userId')
      }
    })
    .post('')
    .reply(200, { data });

    return store.dispatch(starredBoardActions.addBoardStar('orgId', 'boardId'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }
    );
  })
})

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
      boardStars: [{
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
        starredBoards: payload.boardStars
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