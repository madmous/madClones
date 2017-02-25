import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';
import sinon from 'sinon';

import Boards from './Boards';

function setupShallow() {
  let openCreateOrganizationModal = sinon.spy();
  let closeAllModals = sinon.spy();
  let hidePopOver = sinon.spy();

  const props = {
    starredBoards: [{
      _id: 'starredBoard1',
      id: 'org1',
      isStarredBoard: true,
      name: 'PB1'
    }],
    organizations: [{
      _id: "org1",
      boards: [{
        _id: 'orgBoard',
        id: 'orgBoardId',
        isStarredBoard: false,
        name: 'PB2'
      }],
      displayName: 'T1',
      name: 'T1'
    }],
    boards: [{
      _id: 'board1',
      isStarredBoard: true,
      name: 'PB3'
    }],

    displayCreateNewBoard: false,
    displayBoardOptions:false,

    userId: '',
    userInput: '',

    isFetchingUserSuccessful: false,
    isFetchingUser: false,

    organizationActions: {},
    popOverActions: {
      hidePopOver
    },
    boardActions: {},
    modalActions: {
      openCreateOrganizationModal,
      closeAllModals
    }
  }

  const wrapper = shallow(<Boards {...props} />);

  return {
    openCreateOrganizationModal,
    closeAllModals,
    hidePopOver,

    wrapper
  }
}

describe('<span />', () => {
  it('should render span', () => {
    const { wrapper } = setupShallow();

    expect(wrapper.find('span')).to.have.length(1);
  })

  it('should have an onClick defined', () => {
    const { wrapper } = setupShallow();

    expect(wrapper.find('span').props().onClick).to.be.defined;
  })

  xit('should call openCreateOrganizationModal, closeAllModals, hidePopOver', () => {
    const { 
      openCreateOrganizationModal, 
      closeAllModals, 
      hidePopOver, 
      wrapper 
    } = setupShallow();

    expect(wrapper.find('span').simulate('click'));
    expect(openCreateOrganizationModal.calledOnce).to.be.true
    expect(closeAllModals.calledOnce).to.be.true
    expect(hidePopOver.calledOnce).to.be.true
  })
})

describe('<CreateOrganization />', () => {
  it('should render CreateOrganization', () => {
    const { wrapper } = setupShallow();

    expect(wrapper.find('Connect(ReduxForm)')).to.have.length(1);
  })
})

describe('<Boards />', () => {
  it('should render  components boards, starredBoards and organizations', () => {
    const { wrapper } = setupShallow();

    wrapper.setProps({ isFetchingUserSuccessful: true });
    expect(wrapper.find('Board')).to.have.length(3);
  })
})