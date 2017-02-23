import React, { Component, PropTypes } from 'react';

import { BoardViewHeader, Cards } from './components/index';

import './BoardView.css';

const propTypes = {
  isFocusOnCreateCardForm: PropTypes.bool.isRequired,
  isCreateCardFormOpen: PropTypes.bool.isRequired,

  isFocusOnCreateCardItemForm: PropTypes.bool.isRequired,
  isCreateCardItemFormOpen: PropTypes.bool.isRequired,

  boardViewActions: PropTypes.object.isRequired,
  cardActions: PropTypes.object.isRequired
}

export default class BoardView extends Component {
  componentDidMount () {
    document.title = 'BoardView | Trello';
    this.props.cardActions.getCards(this.props.location.pathname);
  }

  componentWillReceiveProps(nextProps) {
    this.props.cardActions.getCards(nextProps.location.pathname);
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

BoardView.propTypes = propTypes;