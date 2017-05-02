import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Board from './Board';

const setupShallow = () => {
  const props = {
    displayCreateNewBoard: true,
    displayBoardOptions: false,
    isOrganizationBoard: false,
    isStarredBoardItem: false,
    boardsToDisplay: [],
    organizationId: '',
    boardTitle: ''
  };

  return shallow(<Board {...props} />);
}

describe('<h3 />', () => {
  it('should render h3', () => {
    const wrapper = setupShallow();

    expect(wrapper.find('h3')).to.have.length(1);
  })

  it('should render h3 content', () => {
    const wrapper = setupShallow();
    const boardTitle = 'Board Title';

    wrapper.setProps({ boardTitle });

    expect(wrapper.find('h3').text()).to.equal(boardTitle);
  })
})

describe('<FontAwesome />', () => {
  it('should render FontAwesome with user as name', () => {
    const wrapper = setupShallow();

    expect(wrapper.find('FontAwesome')).to.have.length(1);
    expect(wrapper.find('FontAwesome').props().name).to.equal('user');
  })

  it('should render FontAwesome with users as name', () => {
    const wrapper = setupShallow();

    wrapper.setProps({ isOrganizationBoard: true });
    expect(wrapper.find('FontAwesome')).to.have.length(1);
    expect(wrapper.find('FontAwesome').props().name).to.equal('users');
  })

  it('should render FontAwesome component with star as name', () => {
    const wrapper = setupShallow();

    wrapper.setProps({ isStarredBoard: true });
    expect(wrapper.find('FontAwesome')).to.have.length(1);
    expect(wrapper.find('FontAwesome').props().name).to.equal('star');
  })
})

describe('<BoardItem />', () => {
  it('should render BoardItem that creates a new board', () => {
    const wrapper = setupShallow();

    expect(wrapper.find('Connect(BoardItem)')).to.have.length(1);
    expect(wrapper.find('Connect(BoardItem)').props().boardName).to.equal('Create new board...');
  })
})

describe('<li><BoardItem /></li>', () => {
  it('should render a list of 2 BoardItem', () => {
    const wrapper = setupShallow();

    wrapper.setProps({
      boardsToDisplay: [
        {
          organizationName: '',
          isStarredBoard: '',
          organizationId: '',
          boardId: '',
          isActiveBoard: true,
          name: '',
          _id: ''
        }
      ]
    });

    expect(wrapper.find('Connect(BoardItem)')).to.have.length(2);
  })
})

describe('<BoardOptions />', () => {
  it('should render BoardOptions', () => {
    const wrapper = setupShallow();

    expect(wrapper.find('BoardOptions')).to.have.length(0);
    wrapper.setProps({ displayBoardOptions: true });
    expect(wrapper.find('BoardOptions')).to.have.length(1);
  })
})