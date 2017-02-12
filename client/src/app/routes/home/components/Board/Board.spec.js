import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Board from './Board';

const setupShallow = () => {
  const props = {
    displayBoardOptions: false,
    isStarredBoardItem: false,
    boardsToDisplay: [],
    organizationId: '',
    boardTitle: ''
  };

  return shallow(<Board {...props} />);
}

describe('Board', () => {

  describe('Board - render', () => {
    it('should render h3 component', () => {
      const wrapper = setupShallow();

      expect(wrapper.find('h3')).to.have.length(1);
    })

    it('should render div components', () => {
      const wrapper = setupShallow();

      expect(wrapper.find('div')).to.have.length(3);
    })

    it('should render ul components', () => {
      const wrapper = setupShallow();

      expect(wrapper.find('ul')).to.have.length(1);
    })

    it('should render fontawesome component with user as name', () => {
      const wrapper = setupShallow();

      expect(wrapper.find('FontAwesome')).to.have.length(1);
      expect(wrapper.find('FontAwesome').props().name).to.equal('user');
    })

    it('should render create new board component', () => {
      const wrapper = setupShallow();

      expect(wrapper.find('Connect(BoardItem)')).to.have.length(1);
      expect(wrapper.find('Connect(BoardItem)').props().boardName).to.equal('Create new board...');
    })
  })

  describe('Board - change props', () => {
    it('should render fontawesome component with users as name', () => {
      const wrapper = setupShallow();

      wrapper.setProps({ displayBoardOptions: true });
      expect(wrapper.find('FontAwesome')).to.have.length(1);
      expect(wrapper.find('FontAwesome').props().name).to.equal('users');
    })

    it('should render fontawesome component with star as name', () => {
      const wrapper = setupShallow();

      wrapper.setProps({ isStarredBoard: true });
      expect(wrapper.find('FontAwesome')).to.have.length(1);
      expect(wrapper.find('FontAwesome').props().name).to.equal('star');
    })

    it('should not render create new board component', () => {
      const wrapper = setupShallow();

      wrapper.setProps({ isStarredBoard: true });
      expect(wrapper.find('Connect(BoardItem)')).to.have.length(0);
    })
  })
})