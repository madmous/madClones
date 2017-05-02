import FontAwesome from 'react-fontawesome';
import React from 'react';

import './HeaderSearch.css';

export default function HeaderSearch(props) {
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
