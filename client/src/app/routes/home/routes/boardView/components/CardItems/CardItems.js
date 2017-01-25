import React from 'react';

import { CreateCardItem } from '../../containers/index';
import { CardItem } from '../index';

import './CardItems.css';

export default function CardItems(props) {
  const { 
    createCardFormIndexToOpen, 
    isCreateCardItemFormOpen, 
    cardPosition 
  } = props;

  const renderCardItems = () => {
    const cards = [ {id: 0, item: 'Red'}, {id: 1, item: 'Blue'}, {id: 2, item: 'Green'} ];

    let cardItems = null;
    cardItems = cards && cards.map((card) => {

      return (
        <CardItem key={card.id} />
      );
    });

    return cardItems;
  }

  const renderCreateCardItem = () => {    
    if (isCreateCardItemFormOpen &&  createCardFormIndexToOpen === cardPosition + 1) {
      return (
        <CreateCardItem />
      )
    }
  }


  return (
    <div className="Card-Items">
      { renderCardItems() }
      { renderCreateCardItem() }
    </div>
  );

}