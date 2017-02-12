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
  const props = {
    organizationId: 'o1',
    isActiveBoard: true,
    boardItemId: 'bi1',
    boardName: 'boardName',
    userId: 'u1'
  }

  return shallow(<BoardItem {...props} />)
};

describe('BoardItem', () => {

  describe('BoardItem - render', () => {
    it('should render li component', () => {
      const wrapper = setupShallow();

      chai.expect(wrapper.find('li')).to.have.length(1);
    })

    it('should render CreateBoard component', () => {
      const wrapper = setupShallow();
      
      chai.expect(wrapper.find('Connect(ReduxForm)')).to.have.length(1);
    })

    it('should render fontawesome component', () => {
      const wrapper = setupShallow();

      chai.expect(wrapper.find('FontAwesome')).to.have.length(1);
      chai.expect(wrapper.find('FontAwesome').props().className).to
          .equal('Board-Item-Tile-Option');
    })
  })

  describe('BoardItem - change props', () => {
    it('should render fontawesome component with starred class name', () => {
      const wrapper = setupShallow();

      wrapper.setProps({ isStarredBoardItem: true });
      chai.expect(wrapper.find('FontAwesome')).to.have.length(1);
      chai.expect(wrapper.find('FontAwesome').props().className).to
          .equal('Board-Item-Tile-Option Board-Item-Tile-Starred');
    })
  })
})