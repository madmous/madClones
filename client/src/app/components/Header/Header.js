import { Link } from 'react-router';
import React from 'react';

import { HeaderSearch, HeaderBoard, HeaderUser } from '../index';

import './Header.css';

export default function Header(props) {
  return (
		<div className="Header">
			<HeaderBoard />
			<HeaderSearch />
			<Link to={`/`}><span className="Header-Logo"></span></Link>
			<HeaderUser/>
		</div>
	);
}
