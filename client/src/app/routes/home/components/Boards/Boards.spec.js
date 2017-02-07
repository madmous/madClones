import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Boards from './Boards';

function setup() {
  const props = {
    starredBoards: [{
      _id: 'starredBoard1',
      id: 'org1',
      isStarredBoard: true,
      name: 'PB1'
    }],
    organizations: [{
      _id: "org1",
      boards: [],
      displayName: 'T1',
      name: 'T1'
    }],
    boards: [{
      _id: 'board1',
      isStarredBoard: true,
      name: 'PB1'
    }],

    userId: '',

    isFetchingUserSuccessful: false,
    isFetchingUser: false,

    organizationActions: {},
    popOverActions: {},
    boardActions: {},
    modalActions: {}
  }

  return shallow(<Boards {...props} />)
}

describe('Boards', () => {
  it('should render span component', () => {
    const wrapper = setup();

    expect(wrapper.find('span')).to.have.length(1);
  })

  it('should render CreateOrganization component', () => {
    const wrapper = setup();

    expect(wrapper.find('Connect(ReduxForm)')).to.have.length(1);
  })
})

describe('Boards - change props', () => {
  it('should render  components boards, starredBoards and organizations', () => {
    const wrapper = setup();

    wrapper.setProps({ isFetchingUserSuccessful: true });
    expect(wrapper.find('Board')).to.have.length(3);
  })
})