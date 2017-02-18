import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import React from 'react';
import chai from 'chai';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import HeaderUserContainer from './HeaderUserContainer';
import HeaderUser from './HeaderUser';

const setupShallow = () => {
  let closeAllModals = sinon.spy();
  let showPopOver = sinon.spy();

  const props = {
    fullName: 'fullName',
    modalActions: {
      closeAllModals
    },
    popOverActions: {
      showPopOver
    }
  }

  const wrapper = shallow(<HeaderUser {...props} />);

  return {
    closeAllModals,
    showPopOver,

    wrapper
  }
};

describe('<span />', () => {
  it('should have an onClick defined', () => {
    const { wrapper } = setupShallow();

    chai.expect(wrapper.find('span').at(1).props().onClick).to.be.defined;
  })

  it('should call closeAllModals and showPopOver', () => {
    const { closeAllModals, showPopOver, wrapper } = setupShallow();

    wrapper.find('span').at(1).simulate('click');

    chai.expect(closeAllModals.calledOnce).to.be.true;
    chai.expect(showPopOver.calledOnce).to.be.true;
  })
})