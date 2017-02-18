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
  let addBoard = sinon.spy();

  const props = {
    organizationId: 'o1',
    isActiveBoard: true,
    boardItemId: 'bi1',
    boardName: 'boardName',
    userId: 'u1',

    boardActions: {
      addBoard
    }
  }

  const wrapper = shallow(<BoardItem {...props} />)

  return {
    addBoard,

    wrapper
  }
};

describe('<BoardItem />', () => {
  it('should render fontawesome component', () => {
    const { wrapper } = setupShallow();

    chai.expect(wrapper.find('FontAwesome')).to.have.length(1);
    chai.expect(wrapper.find('FontAwesome').props().className).to
        .equal('Board-Item-Tile-Option');
  })

  it('should render fontawesome component with starred class name', () => {
    const { wrapper } = setupShallow();

    wrapper.setProps({ isStarredBoardItem: true });
    chai.expect(wrapper.find('FontAwesome')).to.have.length(1);
    chai.expect(wrapper.find('FontAwesome').props().className).to
        .equal('Board-Item-Tile-Option Board-Item-Tile-Starred');
  })
})

describe('<CreateBoard />', () => {
  it('should render CreateBoard', () => {
    const { wrapper } = setupShallow();
    
    chai.expect(wrapper.find('Connect(ReduxForm)')).to.have.length(1);
  })

  describe('onClick event', () => {
    it('should have an onClick defined', () => {
      const { wrapper } = setupShallow();

      chai.expect(wrapper.find('Connect(ReduxForm)').props().onSubmit).to.be.defined;
    })
    
    xit('should call', () => {
      const { addBoard, wrapper } = setupShallow();

      wrapper.find('Connect(ReduxForm)').simulate('submit');

      chai.expect(addBoard.calledOnce).to.be.true;
    })
  })
})

describe('.Board-Tile', () => {
  describe('onClick event', () => {
    it('should have an onClick defined', () => {
      const { wrapper } = setupShallow();

      chai.expect(wrapper.find('.Board-Tile').props().onClick).to.be.defined;
    })
  })

  describe('Board-Tile-Title-Name', () => {
    xit('should render the boardName', () => {
      const { wrapper } = setupShallow();

      chai.expect(wrapper.find('.Board-Tile-Title-Name').props().boardName).to.equal('boardName');
    })

    xit('should render the boardItemSubName', () => {
      const { wrapper } = setupShallow();

      chai.expect(wrapper.find('.Board-Tile-Title-Name').props().boardName).to.equal('boardName');
    })
  })
})