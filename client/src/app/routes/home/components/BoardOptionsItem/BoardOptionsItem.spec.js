import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';

import BoardOptionsItem from './BoardOptionsItem';

function setup() {
  const props = {
    iconName: 'columns',
    boardName: 'Boards'
  }

  return shallow(<BoardOptionsItem {...props} />)
}

describe('<FontAwesome />', () => {
  it('should render FontAwesome', () => {
    const wrapper = setup();

    expect(wrapper.find('FontAwesome')).to.have.length(1);
    expect(wrapper.find('FontAwesome').props().name).to.equal('columns');
  })
})

describe('<span />', () => {
  it('should render span', () => {
    const wrapper = setup();

    expect(wrapper.find('span')).to.have.length(2);
    expect(wrapper.find('span').at(1).text()).to.equal('Boards');
  })
})