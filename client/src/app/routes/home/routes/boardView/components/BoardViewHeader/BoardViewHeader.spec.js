import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import BoardViewHeader from './BoardViewHeader';

function setup() {
  return shallow(<BoardViewHeader />)
}

describe('BoardViewHeader', () => {
  it('should render FontAwesome component', () => {
    const wrapper = setup();

    expect(wrapper.find('FontAwesome')).to.have.length(1);
  })
})