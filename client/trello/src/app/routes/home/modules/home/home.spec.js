import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as homeActions from './home';

import reducer from './home';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('home actions', () => {
  afterEach(() => {
    nock.cleanAll();
  })

  it('should create an action to getHome - success', () => {
    const data = {
      organizations: [],
      starredBoards: [],
      boards: [],
    };

    const expectedActions = [
      { type: 'LOAD_HOME_REQUEST' },
      { type: 'CLOSE_ALL_MODALS' },
      { type: 'UN_AUTHENTICATE_USER' }, 
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          args: ['/login'], 
          method: 'push'
        }
      }
    ];

    const store = mockStore();

    nock('http://localhost:3001', { 
      reqheaders: { 
        'authorization': 'JWT ' + localStorage.getItem('userId') 
      }
    })
    .get('/api/v1/home/')
    .reply(200, { data });

    return store.dispatch(homeActions.getHome())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }
    );
  })

  it('should create an action to getHome - fail', () => {
    const data = {
      error: 'Error'
    };

    const expectedActions = [
      { type: 'LOAD_HOME_REQUEST'}, 
      { type: 'CLOSE_ALL_MODALS'}, 
      { type: 'UN_AUTHENTICATE_USER'}, 
      { payload: 
        {
          args: ['/login'], 
          method: 'push'
        }, 
        type: '@@router/CALL_HISTORY_METHOD'
      }
    ];

    const store = mockStore();

    nock('http://localhost:3001', { 
      reqheaders: { 
        'authorization': 'JWT ' + localStorage.getItem('userId') 
      }
    })
    .get('/api/v1/home/')
    .reply(400, { data });

    return store.dispatch(homeActions.getHome())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }
    );
  })
})

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