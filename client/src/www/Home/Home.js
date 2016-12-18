import React, { Component } from 'react';

import { Header, Boards } from '../../components/index';

import { Root } from '../../containers/index';

import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {user: null};
  }

  render() {
    return (
      <div className="Home">
        <Header />
        <Boards />
      </div>
    );
  }
}
