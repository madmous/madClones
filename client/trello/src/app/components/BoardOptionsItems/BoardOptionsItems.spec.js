import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import BoardOptionsItems from './BoardOptionsItems';

function setup() {
  return shallow(<BoardOptionsItems />)
}

describe('BoardOptionsItems', () => {
  it('should render BoardOptionsItems component', () => {
    const wrapper = setup();

    expect(wrapper.find('BoardOptionsItem')).to.have.length(3);
  })
})