import React, { Component } from 'react';

import { BoardViewHeader, Cards } from './components/index';

import './BoardView.css';

export default class BoardView extends Component {

  componentDidMount () {
    document.title = 'BoardView | Trello';
    this.props.cardActions.getCards(this.props.location.pathname);
  }

  handleDocumentClick = () => {
    const { 
      isFocusOnCreateCardForm, 
      isCreateCardFormOpen, 

      isFocusOnCreateCardItemForm, 
      isCreateCardItemFormOpen, 

      boardViewActions ,
      cardActions ,
    } = this.props;
    
    if (!isFocusOnCreateCardForm && isCreateCardFormOpen) {
      boardViewActions.closeCreateCardForm();
    }

    if (!isFocusOnCreateCardItemForm && isCreateCardItemFormOpen) {
      cardActions.closeCreateCardItemForm();
    }
  }

  handleEscKey = event => {
    const {
      isCreateCardItemFormOpen,
      isCreateCardFormOpen, 

      boardViewActions,
      cardActions
    } = this.props;

    if (event.keyCode === 27) {

      if (isCreateCardFormOpen) {
        boardViewActions.closeCreateCardForm();
      }

      if (isCreateCardItemFormOpen) {
        cardActions.closeCreateCardItemForm();
      }
    } 
  }

  render () {
    return (
      <div 
        className="Board-View"
        tabIndex="0" 
        onClickCapture={ this.handleDocumentClick }
        onKeyDown={ this.handleEscKey } 
      >
        <BoardViewHeader />
        <Cards />
      </div>
    );
  }
}