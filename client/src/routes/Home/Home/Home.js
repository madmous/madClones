import React, { Component } from 'react';

import { Header, Notification } from './components/index';
import { Boards, PopOver } from './containers/index';

import './Home.css';

export default class Home extends Component {

  componentWillMount (){
    document.addEventListener("click", this.handleDocumentClick.bind(this), false);
    document.addEventListener("keydown", this.handleEscKey.bind(this), false);
  }

  componentWillUnmount () {
    document.removeEventListener("click", this.handleDocumentClick.bind(this), false);
    document.removeEventListener("keydown", this.handleEscKey.bind(this), false);
  }

  componentDidMount () {
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
      <div className="Home">
        <Header />
        <Boards />
        { this.getNotificationErrorMessage() }
        { this.getPopOver() }
      </div>
    );
  }
}
