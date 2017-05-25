import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as appActions from './app';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('app actions', () => {
  afterEach(() => {
    nock.cleanAll();
  })

  it('should create an action to updateUser', () => {
    const payload = {}; 
    const expectedAction = {
      type: 'UPDATE_USER',
      payload
    };

    expect(appActions.updateUser(payload)).toEqual(expectedAction)
  })

  it('should create an action to getUser', () => {
    const data = {
      _id: 1,
      fullname: 'Moustapha Amadou Diouf'
    };

    const expectedActions = [
      { type: 'LOAD_USER_REQUEST' },
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
    .get('/api/v1/users/')
    .reply(200, { data });

    return store.dispatch(appActions.getUser())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }
    );
  })
})