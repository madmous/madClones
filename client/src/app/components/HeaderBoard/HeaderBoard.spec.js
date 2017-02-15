import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import React from 'react';
import chai from 'chai';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import HeaderBoardContainer from './HeaderBoardContainer';
import HeaderBoard from './HeaderBoard';

const setupShallow = () => {
  let openBoardsMenu = sinon.spy();

  const props = {
    isBoardMenuOpen: false,
    boardActions: {
      openBoardsMenu
    }
  }

  const wrapper = shallow(<HeaderBoard {...props} />);

  return {
    openBoardsMenu,
    wrapper
  }
};

describe('HeaderBoard', () => {

  describe('HeaderBoard - render', () => {

    it('should render FontAwesome components', () => {
      const { wrapper } = setupShallow();

      chai.expect(wrapper.find('FontAwesome')).to.have.length(1);
      chai.expect(wrapper.find('span')).to.have.length(1);
    })
  })

  it('should call openBoardsMenu prop', () => {
    const { openBoardsMenu, wrapper } = setupShallow();

    chai.expect(openBoardsMenu.calledOnce).to.be.false;
    wrapper.find('.Header-Button').simulate('click');
    chai.expect(openBoardsMenu.calledOnce).to.be.true;
  })
})