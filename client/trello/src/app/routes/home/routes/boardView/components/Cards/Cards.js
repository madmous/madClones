import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { CreateCard, Card } from '../index';

import './Cards.css';

const propTypes = {
  isCreateCardFormOpen: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired
}

class Cards extends Component {
  moveCard = (previousAndNextPositions) => {
    const { cardActions, pathname, cards } = this.props;

    cardActions.moveCardItemAndUpdateCards(previousAndNextPositions, cards, pathname);
  }

  createCard = (formInput) => {
    const { cardActions, pathname } = this.props
    
    cardActions.saveCard(pathname, formInput.name);
  }

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

Cards.propTypes = propTypes;

export default DragDropContext(HTML5Backend)(Cards);