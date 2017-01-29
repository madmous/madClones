import React, { Component } from 'react';

import './CardItem.css';

export default class CardItem extends Component {
  render() {
    const { connectDragSource, id } = this.props;

    return connectDragSource(
      <div className="Card-Item" id={id}>
        <p>{this.props.cardItemText}</p>
      </div>
    );
  }
}