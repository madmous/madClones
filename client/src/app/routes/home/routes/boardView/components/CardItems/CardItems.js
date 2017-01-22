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

  const getAddCardSpanOrForm = () => {
    if (isCreateCardItemFormOpen &&  createCardFormIndexToOpen === cardPosition + 1) {
      return (
        <CreateCardItem />
      )
    }
  }

  return (
    <div className="Card-Items">
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      { getAddCardSpanOrForm() }
    </div>
  );
}