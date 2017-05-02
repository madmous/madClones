import React, { Component } from 'react';

import { CreateCardItem, CardItem } from '../index';

import './CardItems.css';

export default class CardItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderIndex: undefined
    };
  }

  renderCardItems() {
    const { cardItems, isOver, canDrop } = this.props;
    const { placeholderIndex } = this.state;

    let cardList = [];

    cardItems.forEach((cardItem, index) => {
      if (isOver && canDrop && index === 0 && placeholderIndex === -1) {
        cardList.push(<div key="placeholder" className="Card-Items-Placeholder" />);
      }
  
      if (cardItem !== undefined) {
        cardList.push(
          <CardItem 
            index={index}
            key={index}
            cardItemText={cardItem.name}
            moveCard={this.props.moveCard}
            id={cardItem._id}
            x={this.props.x}
            y={index}
          />
        );
      }

      if (isOver && canDrop && placeholderIndex === index) {
        cardList.push(<div key="placeholder" className="Card-Items-Placeholder" />);
      }
    });

    return cardList;
  }

  createCardItem = (formInput) => {
    const { cardActions, pathname, cardId } = this.props;

    cardActions.saveCardItem(pathname, cardId, formInput.name);
  }

  renderCreateCardItem() { 
    const { 
      createCardFormIndexToOpen, 
      isCreateCardItemFormOpen, 
      x 
    } = this.props;

    if (isCreateCardItemFormOpen &&  createCardFormIndexToOpen === x + 1) {
      return (
        <CreateCardItem onSubmit={ this.createCardItem } />
      )
    }
  }

  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div className="Card-Items">
        { this.renderCardItems() }
        { this.renderCreateCardItem() }
      </div>
    );
  }
}