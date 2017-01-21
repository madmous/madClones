import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import './HeaderSearch.css';

export default class HeaderSearch extends Component {
  render() {
    return (
      <div className="Header-Button Header-Board-Search">
        <input 
          className="Header-Board-Search-Input" 
          type="text" 
          autoComplete="off" 
          autoCorrect="off" 
          spellCheck="false" 
          value="" 
        />
        <FontAwesome name="search" className="Header-Board-Search-Icon" />
      </div>
    );
  }
}
