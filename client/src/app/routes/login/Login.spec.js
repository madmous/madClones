import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import React from 'react';
import chai from 'chai';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import LoginContainer from './LoginContainer';
import Login from './Login';

const setupShallow = () => {
  const props = {
    isAuthenticatingSuccessful: false,
    isAuthenticated: false,

    loginActions: {}
  }

  return shallow(<Login {...props} />);
}

const setupMount = authenticated => {
  nock('http://localhost:3001', { 
    reqheaders: { 
      'authorization': 'JWT ' + localStorage.getItem('userId') 
    }
  })
  .get('/api/v1/home/')
  .reply(200, { 
    organizations: [],
    starredBoards: [],
    boards: [], 
  });

  const initialState = {
    login: {
      isAuthenticatingSuccessful: false,
      isAuthenticating: false,
      isAuthenticated: authenticated,

      errorMessage: {}
    }
  };

  const middlewares = [ thunk ];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(initialState);
  
  const wrapper = mount(
    <Provider store={ store }>
      <LoginContainer />
    </Provider>); 
  
  return {
    wrapper,
    store
  };
};

describe('Login', () => {
  afterEach(() => {
    nock.cleanAll();
  })

  describe('Login - render', () => {
    it('should render redux form component', () => {
      const wrapper = setupShallow();

      chai.expect(wrapper.find('Connect(ReduxForm)')).to.have.length(1);
    })

    it('should render p component', () => {
      const wrapper = setupShallow();

      chai.expect(wrapper.find('p')).to.have.length(1);
    })

    it('should render link component', () => {
      const wrapper = setupShallow();

      chai.expect(wrapper.find('Link')).to.have.length(1);
    })
  })

  describe('Login - component lifecycle', () => {
    it('should call componentDidMount method', () => {
      let spy = sinon.spy(Login.prototype, 'componentDidMount');

      const wrapper = setupMount(false);

      expect(spy.calledOnce).toEqual(true);

      spy.restore();
    })

    it('should call componentWillMount method without redirect', () => {
      const expectedActions = [ 
        { type: '@@redux-form/REGISTER_FIELD',
          meta: { form: 'loginForm' },
          payload: { name: 'username', type: 'Field' }
        },
        { type: '@@redux-form/REGISTER_FIELD',
          meta: { form: 'loginForm' },
          payload: { name: 'password', type: 'Field' }
        }
      ];

      let spy = sinon.spy(Login.prototype, 'componentWillMount');

      const { wrapper, store } = setupMount(false);
      
      expect(spy.calledOnce).toEqual(true);
      expect(store.getActions()).toEqual(expectedActions);

      spy.restore();
    })

    it('should call componentWillMount method with redirect', () => {
      const expectedActions = [
        { type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/'] }
        },
        { type: '@@redux-form/REGISTER_FIELD',
          meta: { form: 'loginForm' },
          payload: { name: 'username', type: 'Field' }
        },
        { type: '@@redux-form/REGISTER_FIELD',
          meta: { form: 'loginForm' },
          payload: { name: 'password', type: 'Field' }
        }
      ];

      let spy = sinon.spy(Login.prototype, 'componentWillMount');

      const { wrapper, store } = setupMount(true);
      
      expect(spy.calledOnce).toEqual(true);
      expect(store.getActions()).toEqual(expectedActions);

      spy.restore();
    })
  })
})