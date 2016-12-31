import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header } from '../../components/index';
import { Boards} from '../../containers/index';

import { getUser } from '../../redux/modules/authentication';

import './Home.css';

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
  const { userId, fullName } = state.user;

  return {
    userId,
    fullName
  };
}

export default connect(mapStateToProps)(Home);
