import React from 'react';

import { CardItems } from '../../containers/index';

import './Card.css';

export default function Card(props) {

  const { 
    createCardFormIndexToOpen, 
    isCreateCardItemFormOpen, 
    cardPosition 
  } = props;

  const getAddCardItemSpan = () => {

    if (!isCreateCardItemFormOpen || createCardFormIndexToOpen !== cardPosition + 1) {
      return (
        <span 
          className="Card-Content-Footer"
          onClick={ () => props.cardActions.openCreateCardItemForm(props.cardPosition + 1) }
        >Add a card item...</span>
      )
    }
  }

  return (
    <div className="Card">
      <div className="Card-Content">
        <div className="Card-Content-Header">
          <textarea 
            className="Card-Content-Header-Text" 
            spellCheck="false" 
            dir="auto"
            defaultValue={ props.cardHeader }
          ></textarea>
        </div>
        <CardItems cardPosition={props.cardPosition} />
        { getAddCardItemSpan() }
      </div>
    </div>    
  );
}