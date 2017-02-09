import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as appActions from './app';

import { url } from '../../../utils/url';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('app actions', () => {
  afterEach(() => {
    nock.cleanAll();
  })

  it('should create an action to update user', () => {
    const payload = {}; 
    const expectedAction = {
      type: 'UPDATE_USER',
      payload
    };

    expect(appActions.updateUser(payload)).toEqual(expectedAction)
  })

  it('creates UPDATE_USER when fetching user', () => {
    const data = {
      _id: 1,
      fullname: 'Moustapha Amadou Diouf'
    };

    nock('http://localhost:3001', { 
      reqheaders: { 
        'authorization': 'JWT ' + localStorage.getItem('userId') 
      }
    })
    .get('/api/v1/users/')
    .reply(200, { data });

    const expectedActions = [
      { type: 'LOAD_USER_REQUEST' },
      { type: 'LOAD_USER_SUCCESS' },
      { type: 'UPDATE_USER', payload: data}
    ]
    const store = mockStore({ fullName: '', userId: '' });

    return store.dispatch(appActions.getUser())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})