import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Notification from './Notification';

function setup() {
  const props = { 
    errorMessages: []
  };

  return shallow(<Notification {...props} />);
}

describe('Notification', () => {
  it('should render p component', () => {
    const wrapper = setup();

    expect(wrapper.find('p')).to.have.length(0);
  })
})

describe('Notification - change props', () => {
  it('should render p component', () => {
    const wrapper = setup();

    wrapper.setProps({ errorMessages: ['There is an error'] });
    expect(wrapper.find('p')).to.have.length(1);
    expect(wrapper.find('p').text()).to.equal('There is an error');
  })
})