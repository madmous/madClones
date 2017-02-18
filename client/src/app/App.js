import React, { Component, PropTypes } from 'react';

import { BoardsMenu, PopOver, Header } from './components/index';

import './App.css';

const propTypes = {
  isFocusOnBoardsMenu: PropTypes.bool.isRequired,
  isBoardsMenuOpen: PropTypes.bool.isRequired,

  isFocusOnPopHover: PropTypes.bool.isRequired,
  isPopOverOpen: PropTypes.bool.isRequired,

  isFocusOnModal: PropTypes.bool.isRequired,
  isModalOpen: PropTypes.bool.isRequired,

  isAuthenticated: PropTypes.bool.isRequired,
  errorMessages: PropTypes.array.isRequired,
  fullName: PropTypes.string.isRequired,

  boardsMenuActions: PropTypes.object.isRequired,
  popOverActions: PropTypes.object.isRequired,
  modalActions: PropTypes.object.isRequired,
  appActions: PropTypes.object.isRequired
}

export default class App extends Component {
  componentDidMount() {
    this.props.appActions.getUser();
  }

  handleDocumentClick = () => {
    const {
      isFocusOnBoardsMenu,
      isBoardsMenuOpen,

      isFocusOnPopHover,
      isPopOverOpen,

      isFocusOnModal,
      isModalOpen,

      boardsMenuActions,
      popOverActions,
      modalActions
    } = this.props;
    
    if (!isFocusOnModal && isModalOpen) {
      modalActions.closeAllModals();
    }

    if (!isFocusOnPopHover && isPopOverOpen) {
      popOverActions.hidePopOver();
    };

    if(!isFocusOnBoardsMenu && isBoardsMenuOpen) {
        boardsMenuActions.hideBoardsMenu();
      }
  }

  handleEscKey = event => {
    const {
      isBoardsMenuOpen,
      isPopOverOpen,
      isModalOpen,

      boardsMenuActions,
      popOverActions,
      modalActions,
    } = this.props;

    if (event.keyCode === 27) {
       
      if (isModalOpen) {
        modalActions.closeAllModals();   
      }
      
      if(isPopOverOpen) {
        popOverActions.hidePopOver();
      }

      if(isBoardsMenuOpen) {
        boardsMenuActions.hideBoardsMenu();
      }
    } 
  }

  renderPopOver() {
    if (this.props.isPopOverOpen) {
      return (<PopOver />)
    }
  }

  renderBoardsMenu() {
    if (this.props.isBoardsMenuOpen) {
      return (<BoardsMenu />)
    }
  }

  render() {
    return (
      <div 
        className="App" 
        tabIndex="0" 
        onClickCapture={ this.handleDocumentClick }
        onKeyDown={ this.handleEscKey } 
      >
        <Header />
        { this.props.children }
        { this.renderPopOver() }
        { this.renderBoardsMenu() }
      </div>
    )
  }
}

App.propTypes = propTypes;