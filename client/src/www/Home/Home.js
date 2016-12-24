import React, { Component } from 'react';

import { Header, Boards } from '../../components/index';

import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Header />
        <Boards />
      </div>
    );
  }
}
