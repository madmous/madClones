import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header } from '../../components/index';
import { Boards } from '../../containers/index';

import { loadUser } from '../../redux/modules/authentication';

import './Home.css';

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadUser());
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

function mapStateToProps(state) {
  const { user } = state.authentication;

  return {
    user
  };
}

export default connect(mapStateToProps)(Home);
