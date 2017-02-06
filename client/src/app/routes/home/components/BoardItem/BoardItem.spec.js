import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import BoardItem from './BoardItem';

function setup() {
  const props = {
    organizationId: 'o1',
    isActiveBoard: true,
    boardItemId: 'bi1',
    boardName: 'boardName',
    userId: 'u1'
  }

  return shallow(<BoardItem {...props} />)
}

describe('BoardItem', () => {
  it('should render li component', () => {
    const wrapper = setup();

    expect(wrapper.find('li')).to.have.length(1);
  })

  it('should render CreateBoard component', () => {
    const wrapper = setup();
    
    expect(wrapper.find('Connect(ReduxForm)')).to.have.length(1);
  })

  it('should render fontawesome component', () => {
    const wrapper = setup();

    expect(wrapper.find('FontAwesome')).to.have.length(1);
    expect(wrapper.find('FontAwesome').props().className).to
        .equal('Board-Item-Tile-Option');
  })
})

describe('BoardItem - change props', () => {
  it('should render fontawesome component with starred class name', () => {
    const wrapper = setup();

    wrapper.setProps({ isStarredBoardItem: true });
    expect(wrapper.find('FontAwesome')).to.have.length(1);
    expect(wrapper.find('FontAwesome').props().className).to
        .equal('Board-Item-Tile-Option Board-Item-Tile-Starred');
  })
})