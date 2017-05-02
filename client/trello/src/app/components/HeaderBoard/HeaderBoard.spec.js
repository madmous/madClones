import { shallow, mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import chai from 'chai';

import HeaderBoard from './HeaderBoard';

const setupShallow = () => {
  let openBoardsMenu = sinon.spy();
  let hideBoardsMenu = sinon.spy();

  const props = {
    isBoardMenuOpen: false,
    boardsMenuActions: {
      openBoardsMenu,
      hideBoardsMenu
    }
  };

  const wrapper = shallow(<HeaderBoard {...props} />);

  return {
    openBoardsMenu,
    hideBoardsMenu,

    wrapper
  };
};

describe('<div />', () => {
  it('should have onClick defined', () => {
    const { wrapper } = setupShallow();

    chai.expect(wrapper.find('div').first().props().onClick).to.be.defined;
  })

  it('should call openBoardsMenu', () => {
    const { openBoardsMenu, wrapper } = setupShallow();

    wrapper.find('div').simulate('click');
    
    chai.expect(openBoardsMenu.calledOnce).to.be.true;
  })

  xit('should call hideBoardsMenu', () => {
    const { hideBoardsMenu, wrapper } = setupShallow();

    wrapper.setProps({ isBoardMenuOpen: true });
    wrapper.find('div').simulate('click');
    
    chai.expect(hideBoardsMenu.calledOnce).to.be.true;
  })
})