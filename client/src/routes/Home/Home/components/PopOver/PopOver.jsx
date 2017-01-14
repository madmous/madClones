import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import './PopOver.css';

const propTypes = {
  fullName: PropTypes.string.isRequired
}

export default function PopOver(props) {

  const hidePopOver = () => {
		props.popOverActions.hidePopOver();
	}

  const logout = () => {
    hidePopOver();
    props.loginActions.logoutUser();
  }

  return ( 
    <div className="PopOver">
      <div className="PopOver-Header">
        <span className="PopOver-Header-Title">{ props.fullName }
          <FontAwesome 
            name="times" 
            className="PopOver-Header-Close-Button" 
            onClick={() => { hidePopOver() }} 
          />
        </span>
      </div>
      <div className="PopOver-Content">
        <div className="PopOver-Content-List">
          <p onClick={ () => logout() }>Logout</p>
        </div>
      </div>
    </div>
  );
}

PopOver.propTypes = propTypes;