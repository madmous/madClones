import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { CreateCard, Card } from '../index';

import './Cards.css';

class Cards extends Component {

  renderCards = () => {
    const { cards } = this.props;
    let cardItem = null;
    cardItem = cards && cards.map((card, index) => {
      return (
        <Card 
          cardHeader={card.header}
          cardItems={card.cardItems}
          x={index}
          key={index}
          id={card._id}
          moveCard={this.moveCard}
        />
      );
    });

    return cardItem;
  }

  moveCard = (lastX, lastY, nextX, nextY) => {
    this.props.cardActions.moveCard(lastX, lastY, nextX, nextY);
  }

  createCard = (formInput) => {
    const { cardActions, pathname } = this.props
    
    cardActions.saveCard(pathname, formInput.name);
  }
  
  renderAddCardSpanOrCreateCardForm = () => {
    const {
      isCreateCardFormOpen,
      boardViewActions
    } = this.props;

    if (isCreateCardFormOpen) {
      return (
        <CreateCard onSubmit={ this.createCard } />
      )
    } else {
      return (
        <span onClick={ () => boardViewActions.openCreateCardForm() }>Add a card...</span>
      )
    }
  }

  render() {
    return (
      <div className="Cards">
        { this.renderCards() }
        { this.renderAddCardSpanOrCreateCardForm() }
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Cards)