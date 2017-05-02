import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import Card from './Card';

function setup() {
  const props = {
    createCardFormIndexToOpen: 0, 
    isCreateCardItemFormOpen: false, 
    cardHeader: '',
    cardItems: [],
    x: 0,

    cardActions: {}
  };

  return shallow(<Card {...props} />)
}

describe('Card', () => {
  it('should render CardItems component', () => {
    const wrapper = setup();

    expect(wrapper.find('Connect(DropTarget(CardItems))')).to.have.length(1);
  })

  it('should render textarea component', () => {
    const wrapper = setup();

    expect(wrapper.find('textarea')).to.have.length(1);
  })

  it('should render span component', () => {
    const wrapper = setup();

    expect(wrapper.find('span')).to.have.length(1);
  })
})

describe('Card - change props', () => {
  it('should not render span component', () => {
    const wrapper = setup();

    wrapper.setProps({ 
      isCreateCardItemFormOpen: true,
      createCardFormIndexToOpen: 1
    });
    
    expect(wrapper.find('span')).to.have.length(0);
  })
})