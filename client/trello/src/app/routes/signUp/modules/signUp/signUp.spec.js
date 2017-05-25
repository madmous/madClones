import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as signUpActions from './signUp';

import reducer from './signUp';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('signUp actions', () => {
  afterEach(() => {
    nock.cleanAll();
  })

  it('should create an action to createUser - success', () => {
    const redirectUrl = {
      query : {}
    };

    const data = {
      token: 'token'
    };

    const formInput = {
      username: 'username',
      fullname: 'username',
      initials: 'initials',
      email: 'email',
      password: 'password',
    };

    const expectedActions = [
      { type: 'SIGN_UP_REQUEST' },
      { type: 'SIGN_UP_SUCCESS' },
      { type: 'AUTHENTICATE_USER' }, 
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          args: ['/'], 
          method: 'push'
        }
      }
    ];

    const store = mockStore();

    nock('http://localhost:3002/api/signup/',{
      body: JSON.stringify({
        name: formInput.username,
        fullname: formInput.username,
        initials: formInput.initials,
        email: formInput.email,
        password: formInput.password,
      })},{ 
      reqheaders: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    .post('')
    .reply(200, { data });

    return store.dispatch(signUpActions.createUser(formInput))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }
    );
  })

  it('should create an action to createUser - fail', () => {
    const redirectUrl = {
      query : {}
    };

    const data = {
      uiError: {
        usernameErr: '',
        emailErr: ''
      }
    };

    const formInput = {
      username: 'username',
      fullname: 'username',
      initials: 'initials',
      email: 'email',
      password: 'password',
    };

    const expectedActions = [
      { type: 'SIGN_UP_REQUEST' },
      { 
        type: 'SIGN_UP_FAIL',
        payload:  {
          uiError: {
            'emailErr': '',
            'usernameErr': '',
          }
        }
      }
    ];

    const store = mockStore();

    nock('http://localhost:3002/api/signup/',{
      body: JSON.stringify({
        name: formInput.username,
        fullname: formInput.username,
        initials: formInput.initials,
        email: formInput.email,
        password: formInput.password,
      })},{ 
      reqheaders: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    .post('')
    .reply(400, { data });

    return store.dispatch(signUpActions.createUser(formInput))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }
    );
  })
})

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
    expect(
      reducer([], {
        type: 'SIGN_UP_REQUEST'
      })
    ).toEqual({
        isFetching: true
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
        type: 'SIGN_UP_FAIL',
        payload
      })
    ).toEqual({
        isFetchingSuccessful: true,
        isFetching: false,

        errorMessage: payload.uiError
      }
    )
  })
})