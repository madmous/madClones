import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import React from 'react';
import chai from 'chai';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import SignUpContainer from './SignUpContainer';
import SignUp from './SignUp';

const setupShallow = () => {
  let createUser = sinon.spy();

  const props = {
    isAuthenticatingSuccessful: false,
    isAuthenticated: false,

    signUpActions: {
      createUser
    }
  }

  const wrapper = shallow(<SignUp {...props} />);

  return {
    createUser,
    wrapper
  }
}

const setupMount = authenticated => {
  const initialState = {
    login: {
      isAuthenticatingSuccessful: false,
      isAuthenticating: false,
      isAuthenticated: authenticated,

      errorMessage: {}
    },
    signUp: {
      isFetchingSuccessful: false,
      isFetching: false,

      errorMessage: {}
    },
    signUpActions: {}
  };

  const middlewares = [ thunk ];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(initialState);
  
  const wrapper = mount(
    <Provider store={ store }>
      <SignUpContainer />
    </Provider>); 
  
  return {
    wrapper,
    store
  };
};

describe('SignUp', () => {
  afterEach(() => {
    nock.cleanAll();
  })

  describe('SignUp - render', () => {
    it('should render login form component', () => {
      const { wrapper } = setupShallow();

      chai.expect(wrapper.find('Connect(ReduxForm)')).to.have.length(1);
    })

    it('should render p component', () => {
      const { wrapper } = setupShallow();

      chai.expect(wrapper.find('p')).to.have.length(1);
    })

    it('should render link component', () => {
      const { wrapper } = setupShallow();

      chai.expect(wrapper.find('Link')).to.have.length(1);
    })
  })

  describe('SignUp - component lifecycle', () => {
    it('should call componentDidMount method', () => {
      let spy = sinon.spy(SignUp.prototype, 'componentDidMount');

      const wrapper = setupMount(false);

      expect(spy.calledOnce).toEqual(true);

      spy.restore();
    })

    it('should call componentWillMount method without redirect', () => {
      const expectedActions = [ 
        { type: '@@redux-form/REGISTER_FIELD',
          meta: { form: 'signUpForm' },
          payload: { name: 'username', type: 'Field' }
        },
        { type: '@@redux-form/REGISTER_FIELD',
          meta: { form: 'signUpForm' },
          payload: { name: 'fullname', type: 'Field' }
        },
        { type: '@@redux-form/REGISTER_FIELD',
          meta: { form: 'signUpForm' },
          payload: { name: 'initials', type: 'Field' }
        },
        { type: '@@redux-form/REGISTER_FIELD',
          meta: { form: 'signUpForm' },
          payload: { name: 'email', type: 'Field' }
        },
        { type: '@@redux-form/REGISTER_FIELD',
          meta: { form: 'signUpForm' },
          payload: { name: 'password', type: 'Field' }
        }
      ];

      let spy = sinon.spy(SignUp.prototype, 'componentWillMount');

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
          meta: { form: 'signUpForm' },
          payload: { name: 'username', type: 'Field' }
        },
        { type: '@@redux-form/REGISTER_FIELD',
          meta: { form: 'signUpForm' },
          payload: { name: 'fullname', type: 'Field' }
        },
        { type: '@@redux-form/REGISTER_FIELD',
          meta: { form: 'signUpForm' },
          payload: { name: 'initials', type: 'Field' }
        },
        { type: '@@redux-form/REGISTER_FIELD',
          meta: { form: 'signUpForm' },
          payload: { name: 'email', type: 'Field' }
        },
        { type: '@@redux-form/REGISTER_FIELD',
          meta: { form: 'signUpForm' },
          payload: { name: 'password', type: 'Field' }
        }
      ];

      let spy = sinon.spy(SignUp.prototype, 'componentWillMount');

      const { wrapper, store } = setupMount(true);
      
      expect(spy.calledOnce).toEqual(true);
      expect(store.getActions()).toEqual(expectedActions);

      spy.restore();
    })
  })

  describe('SignUp - event', () => {
    it('should call signUp method', () => {
      let spy = sinon.spy(SignUp.prototype, 'signUp');

      const { wrapper } = setupMount(false);
      
      wrapper.find('button').simulate('submit');

      chai.expect(spy.calledOnce).to.equal(true);
    })

    it('should call createUser prop', () => {
      const { createUser, wrapper } = setupShallow();

      wrapper.instance().signUp({})

      chai.expect(createUser.calledOnce).to.equal(true);
    })
  })
})