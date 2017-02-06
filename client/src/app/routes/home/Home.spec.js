import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Home from './Home';

function setup() {
  const props = {
    errorMessages: [],

    homeActions: {}
  }

  return shallow(<Home {...props} />)
}

describe('Home', () => {
  it('should render boards component', () => {
    const wrapper = setup();

    expect(wrapper.find('Connect(Boards)')).to.have.length(1);
    expect(wrapper.find('Notification')).to.have.length(0);
  })

  it('should render notification component', () => {
    const wrapper = setup();

    expect(wrapper.find('Notification')).to.have.length(0);
    wrapper.setProps({ errorMessages: ['There is an error'] });
    expect(wrapper.find('Notification')).to.have.length(1);
  })
})