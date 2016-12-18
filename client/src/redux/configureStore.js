import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import userReducer from './modules/users'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    userReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}