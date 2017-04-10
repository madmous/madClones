import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import BoardViewHeader from './BoardViewHeader';

function setup() {
  return shallow(<BoardViewHeader boardIdLocation='/boards/1' />)
}

describe('BoardViewHeader', () => {
  it('should render FontAwesome component', () => {
    const wrapper = setup();

    expect(wrapper.find('FontAwesome').props().className).to.equal('Board-View-Header-Star');
  })

  it('should render FontAwesome component with starred class', () => {
    const wrapper = setup();

    wrapper.setProps({
      boards: [{
        id: '1',
        isStarredBoard: true,
        _id:'1'
      }],
      boardIdLocation: '/boards/1'
    });

    expect(wrapper.find('FontAwesome').props().className).to.equal('Board-View-Header-Star Starred');
  })
})