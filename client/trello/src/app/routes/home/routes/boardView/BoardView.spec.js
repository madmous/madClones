import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import BoardView from './BoardView';

function setup() {
  const props = {
    isFocusOnCreateCardForm: false,
    isCreateCardFormOpen: false,

    isFocusOnCreateCardItemForm: false,
    isCreateCardItemFormOpen: false,

    boardViewActions: {},
    cardActions: {},

    location: {
      pathname: '1'
    }
  }

  return shallow(<BoardView {...props} />)
}

describe('BoardView', () => {
  it('should render BoardViewHeader component', () => {
    const wrapper = setup();

    expect(wrapper.find('Connect(BoardViewHeader)')).to.have.length(1);
  })

  it('should render Cards components', () => {
    const wrapper = setup();

    expect(wrapper.find('Connect(DragDropContext(Cards))')).to.have.length(1);
  })
})