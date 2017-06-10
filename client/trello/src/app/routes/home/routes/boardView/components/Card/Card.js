import React from 'react';

import PropTypes from 'prop-types'; 

import { CardItems } from '../index';

import './Card.css';

const propTypes = {
  createCardFormIndexToOpen: PropTypes.number.isRequired, 
  isCreateCardItemFormOpen: PropTypes.bool.isRequired, 
  cardHeader: PropTypes.string.isRequired,
  cardItems: PropTypes.array.isRequired,
  x: PropTypes.number.isRequired,

  cardActions: PropTypes.object.isRequired
}

export default function Card(props) {
  const { 
    createCardFormIndexToOpen, 
    isCreateCardItemFormOpen, 
    cardActions,
    cardHeader,
    cardItems,
    moveCard,
    id,
    x
  } = props;

  const renderAddCardItemSpan = () => {

    if (!isCreateCardItemFormOpen || createCardFormIndexToOpen !== x + 1) {
      return (
        <span 
          className="Card-Content-Footer"
          onClick={ () => cardActions.openCreateCardItemForm(x + 1) }
        >Add a card item...</span>
      )
    }
  };

  return (
    <div className="Card">
      <div className="Card-Content">
        <div className="Card-Content-Header">
          <textarea 
            className="Card-Content-Header-Text" 
            spellCheck="false" 
            dir="auto"
            value={cardHeader}
          ></textarea>
        </div>
        <CardItems
          cardItems={cardItems}
          moveCard={moveCard}
          cardId={id}
          x={x} 
        />
        { renderAddCardItemSpan() }
      </div>
    </div>    
  );
}

Card.propTypes = propTypes;