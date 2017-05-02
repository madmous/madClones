import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import React from 'react';
import chai from 'chai';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import PopOver from './PopOver';

const setupShallow = () => {
  let focusOnPopHover = sinon.spy();
  let blurOnPopHover = sinon.spy();
  let hidePopOver = sinon.spy();

  let logoutUser = sinon.spy();

  const props = {
    fullName: 'fullName',
    popOverActions: {
      focusOnPopHover,
      blurOnPopHover,
      hidePopOver
    },
    loginActions: { logoutUser }
  }

  const wrapper = shallow(<PopOver {...props} />);

  return {
    focusOnPopHover,
    blurOnPopHover,
    hidePopOver,
    logoutUser,

    wrapper
  }
};

describe('<div />', () => {
  it('should have an onFocus and onBlur defined', () => {
    const { wrapper } = setupShallow();

    chai.expect(wrapper.find('.PopOver').props().onFocus).to.be.defined;
    chai.expect(wrapper.find('.PopOver').props().onBlur).to.be.defined;
  })

  it('should call focusOnPopHover and blurOnPopHover', () => {
    const { focusOnPopHover, blurOnPopHover, wrapper } = setupShallow();

    wrapper.find('.PopOver').simulate('focus');
    chai.expect(focusOnPopHover.calledOnce).to.be.true;

    wrapper.find('.PopOver').simulate('blur');
    chai.expect(blurOnPopHover.calledOnce).to.be.true;
  })
})

describe('<FontAwesome />', () => {
  it(' should have an onClick defined', () => {
    const { wrapper } = setupShallow();

    chai.expect(wrapper.find('FontAwesome').props().onClick).to.be.defined;
  })

  it('should call hidePopOver', () => {
    const { hidePopOver, wrapper } = setupShallow();

    wrapper.find('FontAwesome').simulate('click');

    chai.expect(hidePopOver.calledOnce).to.be.true;
  })
})

describe('<p />', () => {
  it(' should have an onClick defined', () => {
    const { wrapper } = setupShallow();

    chai.expect(wrapper.find('p').props().onClick).to.be.defined;
  })

  it('should call hidePopOver', () => {
    const { logoutUser, wrapper } = setupShallow();

    wrapper.find('p').simulate('click');
    chai.expect(logoutUser.calledOnce).to.be.true;
  })
})