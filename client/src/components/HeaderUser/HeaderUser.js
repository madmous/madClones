import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { fetchUsers } from '../../redux/modules/users'

import './HeaderUser.css';

class HeaderUser extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUsers());
  }

  render() {
    const { users } = this.props;

    let userFullname = null;

    if (users.users && users.users[0]) {
      userFullname = users.users[0].fullname;
    }

    return (
      <div className="Header-User">
        <FontAwesome name="plus" className="Header-Button-Icon Header-User-Add" />
        <span className="Header-Button Header-User-Menu">
          <span className="Header-User-Image"></span>
          <span className="Header-User-Name">{{userFullname}}</span>
        </span>
        <FontAwesome name="info" className="Header-Button-Icon Header-Button Header-User-Info" />
        <FontAwesome name="bell-o" className="Header-Button-Icon Header-User-Notifications" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users } = state;

  return {
    users
  };
}

export default connect(mapStateToProps)(HeaderUser);