import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Header } from '../../components/index';
import { Boards } from '../../containers/index';

import { getUser } from '../../redux/modules/authentication';

import './Home.css';

const propTypes = {
  user: PropTypes.object.isRequired
};

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getUser());
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

Home.propTypes = propTypes;

export default connect(mapStateToProps)(Home);
