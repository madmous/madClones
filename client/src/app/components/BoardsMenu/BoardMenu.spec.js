import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import React from 'react';
import chai from 'chai';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import BoardsMenu from './BoardsMenu';

const setupShallow = () => {
  const props = {
  }

  const wrapper = shallow(<BoardsMenu {...props} />);

  return {
    wrapper
  }
};

describe('BoardsMenu', () => {

  describe('BoardsMenu - render', () => {
    it('should .....', () => {
    })
  })
})