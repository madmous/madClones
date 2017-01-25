import React from 'react';

import { CreateCard, Card } from '../../containers/index';

import './Cards.css';

export default function Cards(props) {
  const {
    isCreateCardFormOpen,
    boardViewActions
  } = props;

  const renderCards = () => {
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

   const renderAddCardSpanOrForm = () => {
    if (isCreateCardFormOpen) {
      return (
        <CreateCard />
      )
    } else {
      return (
        <span onClick={ () => boardViewActions.openCreateCardForm() }>Add a card...</span>
      )
    }
  }

  return (
    <div className="Cards">
      { renderCards() }
      { renderAddCardSpanOrForm() }
    </div>
  );
}