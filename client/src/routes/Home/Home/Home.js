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
    const props = this.props;
    
    if (!props.isFocusOnPopHover) {
      props.popOverActions.hidePopOver();
    }

    if (!props.isFocusOnModal) {
      props.modalActions.closeAllModals();
    }
  }

  handleEscKey () {
    if (event.keyCode === 27) {
      this.props.popOverActions.hidePopOver();
      this.props.modalActions.closeAllModals();
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
    if (this.props.displayPopOver) {
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
