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
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.cardActions.getCards(nextProps.location.pathname);
    }
  }
  
  handleDocumentClick = () => {
    const { 
      isFocusOnUpdateBoardNameForm,
      isUpdateBoardNameOpen,

      isFocusOnCreateCardForm, 
      isCreateCardFormOpen, 

      isFocusOnCreateCardItemForm, 
      isCreateCardItemFormOpen, 

      boardViewActions,
      cardActions
    } = this.props;

    if (!isFocusOnUpdateBoardNameForm && isUpdateBoardNameOpen) {
      boardViewActions.closeUpdateBoardNameForm();
    }
    
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
      isUpdateBoardNameOpen,
      isCreateCardFormOpen, 

      boardViewActions,
      cardActions
    } = this.props;

    if (event.keyCode === 27) {
      
      if (isUpdateBoardNameOpen) {
        boardViewActions.closeUpdateBoardNameForm();
      }

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
        <BoardViewHeader boardIdLocation={ this.props.location.pathname } />
        <Cards />
      </div>
    );
  }
}

BoardView.propTypes = propTypes;