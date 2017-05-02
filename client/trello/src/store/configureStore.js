import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux'

import rootReducer from './rootReducer'

const logger = createLogger();
const middleware = routerMiddleware(browserHistory)

export default function configureStoreProd(preloadedState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  if (process.env.NODE_ENV === 'development') {
    return createStore(
      rootReducer,
      preloadedState,
      composeEnhancers(applyMiddleware(thunkMiddleware, middleware, logger))
    )
  } else {
    return createStore(
      rootReducer,
      preloadedState,
      composeEnhancers(applyMiddleware(thunkMiddleware, middleware))
    )
  }
}