import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import React from 'react';
import chai from 'chai';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import BoardItemContainer from './BoardItemContainer';
import BoardItem from './BoardItem';

const setupShallow = () => {
  let removeBoardStar = sinon.spy();
  let addBoardStar = sinon.spy();
  let addBoard = sinon.spy();

  const props = {
    boardItemClassName: 'Boards-Board',
    organizationId: 'o1',
    isActiveBoard: true,
    boardItemId: 'bi1',
    boardName: 'boardName',
    userId: 'u1',

    boardActions: {
      addBoard
    },

    starredBoardActions: {
      removeBoardStar,
      addBoardStar
    }
  }

  const wrapper = shallow(<BoardItem {...props} />)

  return {
    removeBoardStar,
    addBoardStar,
    addBoard,

    wrapper
  }
};

describe('<BoardItem />', () => {
  it('should render fontawesome component', () => {
    const { wrapper } = setupShallow();

    chai.expect(wrapper.find('FontAwesome')).to.have.length(1);
    chai.expect(wrapper.find('FontAwesome').props().className).to
        .equal('Boards-Board-Item-Tile-Option');
  })

  it('should render fontawesome component with starred class name', () => {
    const { wrapper } = setupShallow();

    wrapper.setProps({ isStarredBoardItem: true });
    chai.expect(wrapper.find('FontAwesome')).to.have.length(1);
    chai.expect(wrapper.find('FontAwesome').props().className).to
        .equal('Boards-Board-Item-Tile-Option Boards-Board-Item-Tile-Starred');
  })
})

describe('<CreateBoard />', () => {
  it('should render CreateBoard', () => {
    const { wrapper } = setupShallow();

    wrapper.setProps({
      isActiveBoard: false
    });
    
    chai.expect(wrapper.find('Connect(ReduxForm)')).to.have.length(1);
  })

  describe('onClick event', () => {
    it('should have an onClick defined', () => {
      const { wrapper } = setupShallow();

      wrapper.setProps({
        isActiveBoard: false
      });

      chai.expect(wrapper.find('Connect(ReduxForm)').props().onSubmit).to.be.defined;
    })
    
    xit('should call', () => {
      const { addBoard, wrapper } = setupShallow();

      wrapper.find('Connect(ReduxForm)').simulate('submit');

      chai.expect(addBoard.calledOnce).to.be.true;
    })
  })
})

describe('.Boards-Board-Tile', () => {
  describe('onClick event', () => {
    it('should have an onClick defined', () => {
      const { wrapper } = setupShallow();

      chai.expect(wrapper.find('.Boards-Board-Item-Tile').props().onClick).to.be.defined;
    })
  })

  describe('Boards-Board-Tile-Title-Name', () => {
    xit('should render the boardName', () => {
      const { wrapper } = setupShallow();

      chai.expect(wrapper.find('.Boards-Board-Tile-Title-Name').props().boardName).to.equal('boardName');
    })

    xit('should render the boardItemSubName', () => {
      const { wrapper } = setupShallow();

      chai.expect(wrapper.find('.Boards-Board-Tile-Title-Name').props().boardName).to.equal('boardName');
    })
  })
})

describe('FontAwesome (regular star)', () => {
  describe('onClick event', () => {
    it('should have an onClick defined', () => {
      const { wrapper } = setupShallow();

      wrapper.setProps({
        isStarredBoardItem: false
      });

      chai.expect(wrapper.find('.Boards-Board-Item-Tile-Option').props().onClick).to.be.defined;
    })

    it('should call removeBoardStar action', () => {
      const { addBoardStar, wrapper } = setupShallow();

      wrapper.setProps({
        isStarredBoardItem: false
      });

      wrapper.find('.Boards-Board-Item-Tile-Option').simulate('click', { stopPropagation() {} });

      chai.expect(addBoardStar.calledOnce).to.be.true;
    })
  })
})

describe('FontAwesome (yellow star)', () => {
  describe('onClick event', () => {
    it('should have an onClick defined', () => {
      const { wrapper } = setupShallow();

      wrapper.setProps({
        isStarredBoardItem: true
      });

      chai.expect(wrapper.find('.Boards-Board-Item-Tile-Starred').props().onClick).to.be.defined;
    })

    it('should call removeBoardStar action', () => {
      const { removeBoardStar, wrapper } = setupShallow();

      wrapper.setProps({
        isStarredBoardItem: true
      });

      wrapper.find('.Boards-Board-Item-Tile-Starred').simulate('click', { stopPropagation() {} });

      chai.expect(removeBoardStar.calledOnce).to.be.true;
    })
  })
})