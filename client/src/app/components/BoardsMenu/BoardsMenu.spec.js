import { shallow, mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import chai from 'chai';

import BoardsMenu from './BoardsMenu';

const setupShallow = () => {
  let focusOnBoardsMenu = sinon.spy();
  let blurOnBoardsMenu = sinon.spy();

  const props = {
    boardsMenuActions: {
      focusOnBoardsMenu,
      blurOnBoardsMenu
    }
  }

  const wrapper = shallow(<BoardsMenu {...props} />);

  return {
    focusOnBoardsMenu,
    blurOnBoardsMenu,

    wrapper
  }
};

describe('.BoardsMenu', () => {
  it('should have onBlur defined', () => {
    const { wrapper } = setupShallow();

    chai.expect(wrapper.find('.BoardsMenu').first().props().onFocus).to.be.defined;
  })

  it('should call focusOnBoardsMenu', () => {
    const { focusOnBoardsMenu, blurOnBoardsMenu, wrapper } = setupShallow();

    wrapper.find('.BoardsMenu').simulate('focus');

    chai.expect(blurOnBoardsMenu.calledOnce).to.equal(false);
    chai.expect(focusOnBoardsMenu.calledOnce).to.equal(true);
  })

  it('should have onFocus defined', () => {
    const { wrapper } = setupShallow();

    chai.expect(wrapper.find('.BoardsMenu').first().props().onBlur).to.be.defined;
  })

  it('should call blurOnBoardsMenu', () => {
    const { focusOnBoardsMenu, blurOnBoardsMenu, wrapper } = setupShallow();

    wrapper.find('.BoardsMenu').simulate('blur');

    chai.expect(blurOnBoardsMenu.calledOnce).to.equal(true);
    chai.expect(focusOnBoardsMenu.calledOnce).to.equal(false);
  })
})