import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import SignUp from './SignUp';

function setup() {
  const props = {
    isAuthenticatingSuccessful: false,
    isAuthenticated: false,

    signUpActions: {}
  }

  return shallow(<SignUp {...props} />);
}

describe('SignUp', () => {
  it('should render login form component', () => {
    const wrapper = setup();

    expect(wrapper.find('Connect(ReduxForm)')).to.have.length(1);
  })

  it('should render p component', () => {
    const wrapper = setup();

    expect(wrapper.find('p')).to.have.length(1);
  })

  it('should render link component', () => {
    const wrapper = setup();

    expect(wrapper.find('Link')).to.have.length(1);
  })
})