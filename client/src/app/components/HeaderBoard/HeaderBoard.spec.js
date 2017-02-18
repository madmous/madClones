import { shallow, mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import chai from 'chai';

import HeaderBoard from './HeaderBoard';

const setupShallow = () => {
  let openBoardsMenu = sinon.spy();

  const props = {
    isBoardMenuOpen: false,
    boardsMenuActions: {
      openBoardsMenu
    }
  };

  const wrapper = shallow(<HeaderBoard {...props} />);

  return {
    openBoardsMenu,
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
})