import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Login from './Login';

function setup() {
  const props = {
    isAuthenticatingSuccessful: false,
    isAuthenticated: false,

    loginActions: {}
  }

  return shallow(<Login {...props} />)
}

describe('Login', () => {
  it('should render Login component', () => {
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