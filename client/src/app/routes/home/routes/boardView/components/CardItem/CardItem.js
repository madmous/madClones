import React, { Component, PropTypes } from 'react';

import './CardItem.css';

const propTypes = {
  cardItemText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

export default class CardItem extends Component {
  render() {
    const { connectDragSource, cardItemText, id } = this.props;

    return connectDragSource(
      <div className="Card-Item" id={id}>
        <p>{ cardItemText }</p>
      </div>
    );
  }
}

CardItem.propTypes = propTypes;