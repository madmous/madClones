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

describe('HeaderUser', () => {

  describe('HeaderUser - render', () => {
    it('should render FontAwesome components', () => {
      const { wrapper } = setupShallow();

      chai.expect(wrapper.find('FontAwesome')).to.have.length(3);
      chai.expect(wrapper.find('span')).to.have.length(2);
    })
  })
})