import React, { Component } from 'react';

import { Header, Notification } from './components/index';
import { Boards, PopOver } from './containers/index';

import './Home.css';

export default class Home extends Component {

  componentDidMount () {
    document.title = 'Boards | Trello';
    this.props.userActions.getUser();
  }

  handleDocumentClick () {
    const { 
      isFocusOnPopHover,
      popOverActions,
      isFocusOnModal,
      isPopOverOpen,
      modalActions,
      isModalOpen
    } = this.props;
    
    if (!isFocusOnModal && isModalOpen) {
      modalActions.closeAllModals();
    }

    if (!isFocusOnPopHover && isPopOverOpen) {
      popOverActions.hidePopOver();
    }
  }

  handleEscKey () {
    const { 
      popOverActions,
      isPopOverOpen,
      modalActions,
      isModalOpen
    } = this.props;

    if (event.keyCode === 27) {
       
      if (isModalOpen) {
        modalActions.closeAllModals();   
      } else if(isPopOverOpen) {
        popOverActions.hidePopOver();
      }
    } 
  }

  getNotificationErrorMessage () {
    const { errorMessages } = this.props;

    if (errorMessages && errorMessages.length > 0) {
      return (
        <Notification errorMessages={errorMessages} />
      )
    }
  }

  getPopOver () {
    if (this.props.isPopOverOpen) {
      return (
        <PopOver />
      )
    }
  }

  render () {
    return (
      <div 
        className="Home"
        tabIndex="0" 
        onClickCapture={() => { this.handleDocumentClick() }}
        onKeyDown={() => { this.handleEscKey() }}
      >
        <Header />
        <Boards />
        { this.getNotificationErrorMessage() }
        { this.getPopOver() }
      </div>
    );
  }
}