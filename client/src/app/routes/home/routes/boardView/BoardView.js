import React, { Component } from 'react';

import './BoardView.css';

export default class BoardWrapper extends Component {

  componentDidMount () {
    document.title = 'BoardView | Trello';
  }

  render () {
    return (
      <div className="Board-Wrapper">
      </div>
    );
  }
}