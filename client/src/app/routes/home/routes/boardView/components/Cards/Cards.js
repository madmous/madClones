import React from 'react';

import { CreateCard, Card } from '../../containers/index';

import './Cards.css';

export default function Cards(props) {

  const getAddCardSpanOrForm = () => {
    if (props.isCreateCardFormOpen) {
      return (
        <CreateCard />
      )
    } else {
      return (
        <span onClick={ () => props.boardViewActions.openCreateCardForm() }>Add a card...</span>
      )
    }
  }

  const getCards = () => {
    const cards = ['ToDo', 'In Progress', 'In Review', 'Done'];

    let cardItem = null;
    cardItem = cards && cards.map((card, index) => {
      return (
        <Card 
          cardHeader={card}
          cardPosition={index}
          key={index}
        />
      );
    });

    return cardItem;
  }

  return (
    <div className="Cards">
      { getCards() }
      { getAddCardSpanOrForm() }
    </div>
  );
}