import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import BoardOptions from './BoardOptions';

function setup() {
  return shallow(<BoardOptions />)
}

describe('BoardOptions', () => {
  it('should render BoardOptionsItems component', () => {
    const wrapper = setup();

    expect(wrapper.find('BoardOptionsItems')).to.have.length(1);
  })
})