import { UserAuthWrapper } from 'redux-auth-wrapper';
import { push } from 'react-router-redux';

export const RequiresAuthentication = UserAuthWrapper({
  authSelector: state => state.login,
  predicate: login => login.isAuthenticated,
  redirectAction: push,
  wrapperDisplayName: 'RequiresAuthentication'
})