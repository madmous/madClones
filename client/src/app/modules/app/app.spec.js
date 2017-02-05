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

  /*it('creates UPDATE_USER when fetching user', () => {
    const user = {
      _id: 1,
      fullname: 'Moustapha Amadou Diouf'
    }

    nock(url, { reqheaders: { 'Authorization': 'JWT' }} )
      .get('/api/v1/users/')
      .reply(200, { user })

    const expectedActions = [
      { type: 'LOAD_USER_REQUEST' },
      { type: 'LOAD_USER_SUCCESS' },
      { type: 'UPDATE_USER', payload: { user } }
    ]
    const store = mockStore({ fullName: '', userId: '' });

    return store.dispatch(appActions.getUser())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })*/
})