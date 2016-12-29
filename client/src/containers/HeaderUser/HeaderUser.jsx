import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import './HeaderUser.css';

const propTypes = {
  user: PropTypes.object.isRequired
}

class HeaderUser extends Component {

  render() {
    const { user } = this.props

    return (
      <div className="Header-User">
        <FontAwesome name="plus" className="Header-Button-Icon Header-User-Add" />
        <span className="Header-Button Header-User-Menu">
          <span className="Header-User-Image"></span>
          <span className="Header-User-Name">{ user.fullname }</span>
        </span>
        <FontAwesome name="info" className="Header-Button-Icon Header-Button Header-User-Info" />
        <FontAwesome name="bell-o" className="Header-Button-Icon Header-User-Notifications" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;

  return {
    user
  };
}

HeaderUser.propTypes = propTypes;

export default connect(mapStateToProps)(HeaderUser);