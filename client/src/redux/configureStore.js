import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './modules/index'

export default function configureStore(preloadedState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  )
}