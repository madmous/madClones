import { connect } from 'react-redux';

import HeaderUser from '../components/HeaderUser/HeaderUser'

const mapStateToProps = (state) => {
  const { fullName } = state.user;

  return {
    fullName 
  };
}

export default connect(mapStateToProps)(HeaderUser);