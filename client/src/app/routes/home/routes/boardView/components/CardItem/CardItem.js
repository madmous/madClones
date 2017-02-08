import React, { Component, PropTypes } from 'react';

import './CardItem.css';

const propTypes = {
  cardItemText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

export default function CardItem(props) {
  const { connectDragSource, cardItemText, id } = props;

  return connectDragSource(
    <div className="Card-Item" id={id}>
      <p>{ cardItemText }</p>
    </div>
  );
}

CardItem.propTypes = propTypes;