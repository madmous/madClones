import React, { Component } from 'react';

import { Board } from '../index';

import './Boards.css';

export default class Boards extends Component {
  
  render() {
    return (
			<div className="Boards">
        <Board isStarredBoard={true} />
        <Board isPersonalBoard={true} />
        <Board isPersonalBoard={false} />
        <div className="Boards-Create">
          <span>Create a new team...</span>
        </div>
      </div>
    );
  }
}