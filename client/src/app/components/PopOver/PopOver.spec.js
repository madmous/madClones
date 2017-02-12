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
  const props = {
    fullName: 'fullName',
    popOverActions: {},
    loginActions: {}
  }

  const wrapper = shallow(<PopOver {...props} />);

  return {
    wrapper
  }
};

describe('PopOver', () => {

  describe('PopOver - render', () => {
    it('should render FontAwesome components', () => {
      const { wrapper } = setupShallow();

      chai.expect(wrapper.find('FontAwesome')).to.have.length(1);
      chai.expect(wrapper.find('span')).to.have.length(1);
      chai.expect(wrapper.find('p')).to.have.length(1);
    })
  })
})