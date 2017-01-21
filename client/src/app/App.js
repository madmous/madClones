import React, { Component } from 'react';

import { PopOver } from './containers/index';
import { Header } from './components/index';

import './App.css'

export default class App extends Component {

  componentDidMount () {
    this.props.appActions.getUser();
  }

  handleDocumentClick = () => {
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

  handleEscKey = event => {
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

  getPopOver = () => {
    if (this.props.isPopOverOpen) {
      return (
        <PopOver />
      )
    }
  }

  render() {
    return (
      <div 
        className="App" tabIndex="0" 
        onClickCapture={ this.handleDocumentClick }
        onKeyDown={ this.handleEscKey } 
      >
        <Header />
        { this.props.children }
        { this.getPopOver() }
      </div>
    )
  }
}