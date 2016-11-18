import React, { Component } from 'react';

import { BoardOptionsItems } from '../index';

import './BoardOptions.css';

export default class BoardOptions extends Component {

  render() {
    return (
      <div className="BoardOptions">
        <BoardOptionsItems />
      </div>
    );
  }
}
