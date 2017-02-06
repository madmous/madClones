import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';

import App from './App';

function setup() {
  const props = {
    isFocusOnPopHover: false,
    isAuthenticated: true,
    isFocusOnModal: false,
    isPopOverOpen: false,
    errorMessages: [],
    isModalOpen: false,
    fullName: 'Test Full Name',

    popOverActions: {},
    modalActions: {},
    appActions: {}
  }

  return shallow(<App {...props} />)
}

describe('App', () => {
  it('should render header component', () => {
    const wrapper = setup();

    expect(wrapper.find('Connect(PopOver)')).to.have.length(0);
    expect(wrapper.find('Header')).to.have.length(1);
  })

  it('should render popOver component', () => {
    const wrapper = setup();

    expect(wrapper.find('PopOver')).to.have.length(0);
    wrapper.setProps({ isPopOverOpen: true });
    expect(wrapper.find('Connect(PopOver)')).to.have.length(1);
  })
})