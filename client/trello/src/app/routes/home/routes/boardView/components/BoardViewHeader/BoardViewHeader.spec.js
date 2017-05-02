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

describe('</UpdateBoardName>', () => {
  it('should not render update board name form', () => {
    const { wrapper } = setup();

    expect(wrapper.find('Connect(ReduxForm)').length).to.equal(0);
  })

  it('should render update board name form', () => {
    const { wrapper } = setup();

    wrapper.setProps({
      isUpdateBoardNameOpen: true
    });
    
    expect(wrapper.find('Connect(ReduxForm)').length).to.equal(1);
  })
})