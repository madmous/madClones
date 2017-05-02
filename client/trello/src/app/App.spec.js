import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import sinon from 'sinon';
import chai from 'chai';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import AppContainer from './AppContainer';
import App from './App';

const setupShallow = () => {
  let hideBoardsMenu = sinon.spy();
  let closeAllModals = sinon.spy();
  let hidePopOver = sinon.spy();
  let getUser = sinon.spy();

  const props = {
    isFocusOnBoardsMenu: false,
    isBoardsMenuOpen: false,

    isFocusOnPopHover: false,
    isPopOverOpen: false,
    
    isFocusOnModal: false,
    isModalOpen: false,
    
    isAuthenticated: true,

    errorMessages: [],
    fullName: 'fullName',

    popOverActions: {
      hidePopOver
    },
    modalActions: {
      closeAllModals
    },
    appActions: {
      getUser
    },
    boardsMenuActions: {
      hideBoardsMenu
    }
  };

  const wrapper = shallow(<App {...props} />);  

  return {
    hideBoardsMenu,
    closeAllModals,
    hidePopOver,
    getUser,

    wrapper
  }
};

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
    boardsMenu: {
      isFocusOnBoardsMenu: false,
      isBoardsMenuOpen: false
    },
    board: {
      isBoardsMenuOpen: false
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

const setupRender = () => {
  return render(<App />);
}

describe('<App />', () => {  
  it('should call componentDidMount', () => {
    let spy = sinon.spy(App.prototype, 'componentDidMount');

    const wrapper = setupMount();

    chai.expect(spy.calledOnce).to.equal(true);

    spy.restore();
    nock.cleanAll();
  })
})

describe('<div />', () => {
  describe('onClick event', () => {
    it('should have an onClickCapture defined', () => {
      const { wrapper } = setupShallow();

      chai.expect(wrapper.find('div').props().onClick).to.be.defined;
    })
    
    it('should not do any call', () => {
      const { closeAllModals, hideBoardsMenu, hidePopOver, wrapper } = setupShallow();

      wrapper.find('div').simulate('click');

      chai.expect(closeAllModals.calledOnce).to.be.false;
      chai.expect(hideBoardsMenu.calledOnce).to.be.false;
      chai.expect(hidePopOver.calledOnce).to.be.false;
    })

    xit('should call closeAllModals', () => {
      const { closeAllModals, hideBoardsMenu, hidePopOver, wrapper } = setupShallow();

      wrapper.setProps({ 
        isFocusOnModal: false,
        isModalOpen: true
      });

      wrapper.find('div').simulate('click');

      chai.expect(closeAllModals.calledOnce).to.be.true;
      chai.expect(hideBoardsMenu.calledOnce).to.be.false;
      chai.expect(hidePopOver.calledOnce).to.be.false;
    })

    xit('should call hideBoardsMenu', () => {
      const { closeAllModals, hideBoardsMenu, hidePopOver, wrapper } = setupShallow();

      wrapper.setProps({ 
        isFocusOnPopHover: false,
        isPopOverOpen: true
      });

      wrapper.find('FontAwesome').simulate('click');

      chai.expect(closeAllModals.calledOnce).to.be.false;
      chai.expect(hideBoardsMenu.calledOnce).to.be.true;
      chai.expect(hidePopOver.calledOnce).to.be.false;
    })

    xit('should call hidePopOver', () => {
      const { closeAllModals, hideBoardsMenu, hidePopOver, wrapper } = setupShallow();

      wrapper.setProps({ 
        isFocusOnBoardsMenu: false,
        isBoardsMenuOpen: true
      });

      wrapper.find('div').simulate('click');

      chai.expect(closeAllModals.calledOnce).to.be.false;
      chai.expect(hideBoardsMenu.calledOnce).to.be.false;
      chai.expect(hidePopOver.calledOnce).to.be.true;
    })
  })

  describe('onKeyDown event', () => {
    it('should have an onKeyDown defined', () => {
      const { wrapper } = setupShallow();

      chai.expect(wrapper.find('div').props().onKeyDown).to.be.defined;
    })

    it('should not do any call', () => {
      const { closeAllModals, hideBoardsMenu, hidePopOver, wrapper } = setupShallow();

      wrapper.find('div').simulate('keyDown', { keyCode: 28 });

      chai.expect(closeAllModals.calledOnce).to.be.false;
      chai.expect(hideBoardsMenu.calledOnce).to.be.false;
      chai.expect(hidePopOver.calledOnce).to.be.false;
    })

    it('should call closeAllModals', () => {
      const { closeAllModals, hideBoardsMenu, hidePopOver, wrapper } = setupShallow();

      wrapper.setProps({ isModalOpen: true });

      wrapper.find('div').simulate('keyDown', { keyCode: 27 });

      chai.expect(closeAllModals.calledOnce).to.be.true;
      chai.expect(hideBoardsMenu.calledOnce).to.be.false;
      chai.expect(hidePopOver.calledOnce).to.be.false;
    })

    it('should call hideBoardsMenu', () => {
      const { closeAllModals, hideBoardsMenu, hidePopOver, wrapper } = setupShallow();

      wrapper.setProps({ isBoardsMenuOpen: true });

      wrapper.find('div').simulate('keyDown', { keyCode: 27 });

      chai.expect(closeAllModals.calledOnce).to.be.false;
      chai.expect(hideBoardsMenu.calledOnce).to.be.true;
      chai.expect(hidePopOver.calledOnce).to.be.false;
    })

    it('should call hidePopOver', () => {
      const { closeAllModals, hideBoardsMenu, hidePopOver, wrapper } = setupShallow();

      wrapper.setProps({ isPopOverOpen: true });

      wrapper.find('div').simulate('keyDown', { keyCode: 27 });

      chai.expect(closeAllModals.calledOnce).to.be.false;
      chai.expect(hideBoardsMenu.calledOnce).to.be.false;
      chai.expect(hidePopOver.calledOnce).to.be.true;
    })
  })
})

describe('<PopOver />', () => { 
  it('should be defined', () => {
    const { wrapper } = setupShallow();

    chai.expect(wrapper.find('PopOver')).to.have.length(0);
    wrapper.setProps({ isPopOverOpen: true });
    chai.expect(wrapper.find('Connect(PopOver)')).to.have.length(1);
  })
})

describe('<BoardsMenu />', () => {
  it('should be defined', () => {
    const { wrapper } = setupShallow();

    chai.expect(wrapper.find('Connect(BoardsMenu)')).to.have.length(0);
    wrapper.setProps({ isBoardsMenuOpen: true });
    chai.expect(wrapper.find('Connect(BoardsMenu)')).have.length(1);
  })
})

describe('<Header />', () => {
  it('should be defined', () => {
    const { wrapper } = setupShallow();

    chai.expect(wrapper.find('Header')).to.have.length(1);
  })
})