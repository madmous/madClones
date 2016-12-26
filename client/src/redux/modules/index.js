import { combineReducers } from 'redux'

import authentication from './authentication'
import home from './home'

const rootReducer = combineReducers({
  authentication,
  home
})

export default rootReducer;