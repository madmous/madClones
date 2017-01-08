import React, { PropTypes } from 'react';  
import { connect } from 'react-redux';  
import { push } from 'react-router-redux';

import './requiresAuth.css'

export default function requiresAuth(Component) {  
  class AuthenticatedComponent extends Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
      this.checkAndRedirect();
    }

    componentDidUpdate() {
      this.checkAndRedirect();
    }

    checkAndRedirect() {
      const { dispatch, isAuthenticated } = this.props;

      if (!isAuthenticated) {
        dispatch(push('/login'));
      }
    }

    render() {
      return (
        <div className="authenticated">
          { this.props.isAuthenticated ? <Component {...this.props} /> : null }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.login.isAuthenticated
    };
  };

  return connect(mapStateToProps)(AuthenticatedComponent);
}