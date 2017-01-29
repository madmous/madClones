import React, { Component } from 'react';
import { Link } from 'react-router';

import { HeaderSearch, HeaderBoard, HeaderUser } from '../index';

import './Header.css';

export default class Header extends Component {
  render() {
    return (
			<div className="Header">
				<HeaderBoard />
				<HeaderSearch />
				<Link to={`/`}><span className="Header-Logo"></span></Link>
				<HeaderUser/>
			</div>
		);
  }
}
