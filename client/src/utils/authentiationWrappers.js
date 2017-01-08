import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';

export const RequiresAuthentication = UserAuthWrapper({
  authSelector: state => state.login,
  predicate: login => login.isAuthenticated,
  authenticatingSelector: state => state.login.isAuthenticating,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserNeedsToBeAuthenticated'
})