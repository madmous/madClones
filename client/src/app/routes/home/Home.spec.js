import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import HomeContainer from './HomeContainer';
import Home from './Home';

const setupShallow = () => {
  const props = {
    errorMessages: [],

    homeActions: {}
  }

  return shallow(<Home {...props} />)
}

const setupMount = () => {
  const initialState = {
    app: {
      errorMessage: '',
      fullName: 'Mous',
      isFetching: true,
      isFetchingUser: false,
      isFetchingUserSuccessful: true,
      userId: '1'
    },
    starredBoard: { 
      starredBoards: [] 
    },
    organization: { 
      organizations: [] 
    },
    board: { 
      boards: [] 
    },
    boardsMenu: {
      isFocusOnBoardsMenu: false,
      isBoardsMenuOpen: false,

      userInput: ''
    },
    modals: {
      isCreateOrganizationModalOpen: false,
      isCreateBoardModalOpen: false,
      isFocusOnModal: false,
      isModalOpen: false
    },
    notification: {
      errorMessages: [], 
      isPopOverOpen: false
    },
    homeActions: {}
  };

  const middlewares = [ thunk ];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(initialState);
  
  return mount(
    <Provider store={ store }>
      <HomeContainer />
    </Provider>); 
};

describe('<Home />', () => {
  it('should call componentDidMount', () => {
    let spy = sinon.spy(Home.prototype, 'componentDidMount');

    const wrapper = setupMount();

    expect(spy.calledOnce).to.equal(true);

    spy.restore();
    nock.cleanAll();
  })
})

describe('<Boards />', () => {
  it('should render Boards', () => {
    const wrapper = setupShallow();

    expect(wrapper.find('Connect(Boards)')).to.have.length(1);
    expect(wrapper.find('Notification')).to.have.length(0);
  })
})

describe('<Notification />', () => {
  it('should render Notification', () => {
    const wrapper = setupShallow();

    expect(wrapper.find('Notification')).to.have.length(0);
    wrapper.setProps({ errorMessages: ['There is an error'] });
    expect(wrapper.find('Notification')).to.have.length(1);
  })
})