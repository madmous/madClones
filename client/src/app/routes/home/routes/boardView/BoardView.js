import React, { Component } from 'react';

import { BoardViewHeader } from './components/index';
import { Cards } from './containers/index';

import './BoardView.css';

export default class BoardWrapper extends Component {

  componentDidMount () {
    document.title = 'BoardView | Trello';
  }

  handleDocumentClick = () => {
    const { 
      isFocusOnCreateCardForm, 
      isCreateCardFormOpen, 
      boardViewActions 
    } = this.props;
    
    if (!isFocusOnCreateCardForm && isCreateCardFormOpen) {
      boardViewActions.closeCreateCardForm();
    }
  }

  handleEscKey = event => {
    const { 
      isCreateCardFormOpen, 
      boardViewActions
    } = this.props;

    if (event.keyCode === 27 && isCreateCardFormOpen) {
      boardViewActions.closeCreateCardForm();
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