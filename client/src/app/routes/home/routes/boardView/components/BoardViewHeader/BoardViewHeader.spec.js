import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';

import BoardViewHeader from './BoardViewHeader';

function setup() {
  let handleBoardNameClicked = sinon.spy();
  let updateBoardName = sinon.spy();

  const props = {
    boardIdLocation: '/boards/1',

    boardActions: {
      handleBoardNameClicked,
      updateBoardName
    }
  };

  const wrapper = shallow(<BoardViewHeader {...props} />);

  return {
    handleBoardNameClicked,
    updateBoardName,

    wrapper
  }
}

describe('FontAwesome', () => {
  it('should render FontAwesome component', () => {
    const { wrapper } = setup();

    expect(wrapper.find('FontAwesome').props().className).to.equal('Board-View-Header-Star');
  })

  it('should render FontAwesome component with starred class', () => {
    const { wrapper } = setup();

    wrapper.setProps({
      boards: [{
        id: '1',
        isStarredBoard: true,
        _id:'1'
      }],
      boardIdLocation: '/boards/1'
    });

    expect(wrapper.find('FontAwesome').props().className).to.equal('Board-View-Header-Star Starred');
  })
})

describe('</CreateOrganization>', () => {
  it('should not render create organization form', () => {
    const { wrapper } = setup();

    expect(wrapper.find('CreateOrganization').length).to.equal(0);
  })

  it('should render create organization form', () => {
    const { wrapper } = setup();

    wrapper.setProps({
      isUpdateBoardNameOpen: true
    });
    
    expect(wrapper.find('CreateOrganization').length).to.equal(1);
  })
})