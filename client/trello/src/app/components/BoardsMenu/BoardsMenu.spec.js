import { shallow, mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import chai from 'chai';

import BoardsMenu from './BoardsMenu';

const setupShallow = () => {
  let focusOnBoardsMenu = sinon.spy();
  let blurOnBoardsMenu = sinon.spy();
  let saveUserInput = sinon.spy();

  const props = {
    boardsMenuActions: {
      focusOnBoardsMenu,
      blurOnBoardsMenu,
      saveUserInput
    }
  }

  const wrapper = shallow(<BoardsMenu {...props} />);

  return {
    focusOnBoardsMenu,
    blurOnBoardsMenu,
    saveUserInput,

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

    chai.expect(blurOnBoardsMenu.calledOnce).to.be.true;
    chai.expect(focusOnBoardsMenu.calledOnce).to.be.false;
  })
})

describe('input', () => { 
  it('should have onChange defined', () => {
    const { wrapper } = setupShallow();

    chai.expect(wrapper.find('input').first().props().onChange).to.be.defined;
  })

  it('should call saveUserInput', () => {
    const { saveUserInput, wrapper } = setupShallow();

    wrapper.find('input').simulate('change', { target: { value: 'T' } })

    chai.expect(saveUserInput.calledOnce).to.be.true;
  })
})