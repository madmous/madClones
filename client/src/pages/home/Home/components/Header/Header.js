import React, { Component } from 'react';

import { HeaderSearch, HeaderBoard } from '../index';
import { HeaderUser } from '../../containers/index';

import './Header.css';

export default class Header extends Component {
  render() {
    return (
			<div className="Header">
				<HeaderBoard />
				<HeaderSearch />
				<span className="Header-Logo"></span>
				<HeaderUser/>
			</div>
		);
  }
}
