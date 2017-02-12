import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import { Provider } from 'react-redux';

import AppContainer from './AppContainer';
import App from './App';

const setupShallow = () => {
  let closeAllModals = sinon.spy();
  let hidePopOver = sinon.spy();
  let getUser = sinon.spy();

  const props = {
    isFocusOnPopHover: false,
    isAuthenticated: true,
    isFocusOnModal: false,
    isPopOverOpen: false,
    errorMessages: [],
    isModalOpen: false,
    fullName: 'fullName',

    popOverActions: {
      hidePopOver
    },
    modalActions: {
      closeAllModals
    },
    appActions: {
      getUser
    }
  };

  const wrapper = shallow(<App {...props} />);  

  return {
    closeAllModals,
    hidePopOver,
    getUser,

    wrapper
  }
};

const setupRender = () => {
  return render(<App />);
}

const setupMount = () => {
  nock('http://localhost:3001', { 
    reqheaders: { 
      'authorization': 'JWT ' + localStorage.getItem('userId') 
    }
  })
  .get('/api/v1/users/')
  .reply(200, { 
    _id: 1,
    fullname: 'Moustapha Amadou Diouf' 
  });
    
  const initialState = {
    popOver: {
      isFocusOnPopHover: false, 
      isPopOverOpen: false
    },
    login: {
      isAuthenticated: false
    },
    modals: {
      isFocusOnModal: false, 
      isModalOpen: false
    },
    notification: {
      errorMessages: []
    },
    app: {
      fullName: 'fullName'
    }
  };

  const middlewares = [ thunk ];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(initialState);
  
  return mount(
    <Provider store={ store }>
      <AppContainer />
    </Provider>); 
};

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('App', () => {
  it('should render header component', () => {
    const { wrapper } = setupShallow();

    expect(wrapper.find('Connect(PopOver)')).to.have.length(0);
    expect(wrapper.find('Header')).to.have.length(1);
  })

  it('should render popOver component', () => {
    const { wrapper } = setupShallow();

    expect(wrapper.find('PopOver')).to.have.length(0);
    wrapper.setProps({ isPopOverOpen: true });
    expect(wrapper.find('Connect(PopOver)')).to.have.length(1);
  })
})

describe('App - handleDocumentClick event', () => {
  it('should call handleDocumentClick method', () => {
    let spy = sinon.spy(App.prototype, 'handleDocumentClick');

    const wrapper = setupMount();
    wrapper.find('App').simulate('click');

    expect(spy.calledOnce).to.equal(true);
  })

  it('should not call closeAllModals and hidePopOver props', () => {
    const { closeAllModals, hidePopOver, wrapper } = setupShallow();

    wrapper.instance().handleDocumentClick();

    expect(closeAllModals.calledOnce).to.be.false;
    expect(hidePopOver.calledOnce).to.be.false;
  })

  it('should call closeAllModals prop', () => {
    const { closeAllModals, hidePopOver, wrapper } = setupShallow();

    wrapper.setProps({ isModalOpen: true });
    wrapper.instance().handleDocumentClick();

    expect(closeAllModals.calledOnce).to.be.true;
    expect(hidePopOver.calledOnce).to.be.false;
  })

  it('should call hidePopOver prop', () => {
    const { closeAllModals, hidePopOver, wrapper } = setupShallow();

    wrapper.setProps({ isPopOverOpen: true });
    wrapper.instance().handleDocumentClick();

    expect(closeAllModals.calledOnce).to.be.false;
    expect(hidePopOver.calledOnce).to.be.true;
  })

  it('should call closeAllModals and hidePopOver props', () => {
    const { closeAllModals, hidePopOver, wrapper } = setupShallow();

    wrapper.setProps({
      isPopOverOpen: true,
      isModalOpen: true
    });

    wrapper.instance().handleDocumentClick();

    expect(closeAllModals.calledOnce).to.be.true;
    expect(hidePopOver.calledOnce).to.be.true;
  })
})

describe('App - handleEscKey event', () => {
  it('should call handleEscKey method', () => {
    let spy = sinon.spy(App.prototype, 'handleEscKey');

    const wrapper = setupMount();
    wrapper.find('App').simulate('keyDown', { keyCode: 27 });

    expect(spy.calledOnce).to.equal(true);
  })

  it('should call not closeAllModals and hidePopOver prop', () => {
    const { closeAllModals, hidePopOver, wrapper } = setupShallow();
    const event = { keyCode: 27 };
    
    wrapper.instance().handleEscKey(event);

    expect(closeAllModals.calledOnce).to.be.false;
    expect(hidePopOver.calledOnce).to.be.false;
  })

  it('should call closeAllModals prop', () => {
    const { closeAllModals, hidePopOver, wrapper } = setupShallow();
    const event = { keyCode: 27 };

    wrapper.setProps({ isModalOpen: true });
    wrapper.instance().handleEscKey(event);

    expect(closeAllModals.calledOnce).to.be.true;
    expect(hidePopOver.calledOnce).to.be.false;
  })

  it('should call closeAllModals prop', () => {
    const { closeAllModals, hidePopOver, wrapper } = setupShallow();
    const event = { keyCode: 27 };

    wrapper.setProps({ isPopOverOpen: true });
    wrapper.instance().handleEscKey(event);

    expect(closeAllModals.calledOnce).to.be.false;
    expect(hidePopOver.calledOnce).to.be.true;
  })

  it('should call closeAllModals and hidePopOver prop', () => {
    const { closeAllModals, hidePopOver, wrapper } = setupShallow();
    const event = { keyCode: 27 };

    wrapper.setProps({ 
      isPopOverOpen: true,
      isModalOpen: true
    });

    wrapper.instance().handleEscKey(event);

    expect(closeAllModals.calledOnce).to.be.true;
    expect(hidePopOver.calledOnce).to.be.true;
  })
})