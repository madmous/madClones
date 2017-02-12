import React, { Component, PropTypes } from 'react';

import { PopOver, Header } from './components/index';

import './App.css';

const propTypes = {
  isFocusOnPopHover: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isFocusOnModal: PropTypes.bool.isRequired,
  isPopOverOpen: PropTypes.bool.isRequired,
  errorMessages: PropTypes.array.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  fullName: PropTypes.string.isRequired,

  popOverActions: PropTypes.object.isRequired,
  modalActions: PropTypes.object.isRequired,
  appActions: PropTypes.object.isRequired
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.renderPopOver = this.renderPopOver.bind(this);
    this.handleEscKey = this.handleEscKey.bind(this);
  }

  componentDidMount() {
    this.props.appActions.getUser();
  }

  handleDocumentClick() {
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
    };
  }

  handleEscKey(event) {
    const { 
      popOverActions,
      isPopOverOpen,
      modalActions,
      isModalOpen
    } = this.props;

    if (event.keyCode === 27) {
       
      if (isModalOpen) {
        modalActions.closeAllModals();   
      }
      
      if(isPopOverOpen) {
        popOverActions.hidePopOver();
      }
    } 
  }

  renderPopOver() {
    if (this.props.isPopOverOpen) {
      return (<PopOver />)
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
      </div>
    )
  }
}

App.propTypes = propTypes;