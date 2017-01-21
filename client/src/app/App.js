import React from 'react';

import { PopOver } from './containers/index';
import { Header } from './components/index';

import './App.css'

export default function App(props) {

  const handleDocumentClick = () => {
    const { 
      isFocusOnPopHover,
      popOverActions,
      isFocusOnModal,
      isPopOverOpen,
      modalActions,
      isModalOpen
    } = props;
    
    if (!isFocusOnModal && isModalOpen) {
      modalActions.closeAllModals();
    }

    if (!isFocusOnPopHover && isPopOverOpen) {
      popOverActions.hidePopOver();
    }
  }

  const handleEscKey = event => {
    const { 
      popOverActions,
      isPopOverOpen,
      modalActions,
      isModalOpen
    } = props;

    if (event.keyCode === 27) {
       
      if (isModalOpen) {
        modalActions.closeAllModals();   
      } else if(isPopOverOpen) {
        popOverActions.hidePopOver();
      }
    } 
  }

  const getPopOver = () => {
    if (props.isPopOverOpen) {
      return (
        <PopOver />
      )
    }
  }

  return (
    <div 
      className="App" tabIndex="0" 
      onClickCapture={ handleDocumentClick }
      onKeyDown={ handleEscKey } 
    >
      <Header />
      { props.children }
      { getPopOver() }
    </div>
  )
}