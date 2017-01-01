import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import authentication from './authentication'
import organization from './organization'
import starredBoard from './starredBoard'
import notification from './notification'
import modals from './modals'
import board from './board'
import user from './user'

const rootReducer = combineReducers({
  authentication,
  organization,
  starredBoard,
  notification,
  modals,
  board,
  form: formReducer,
  user
})

export default rootReducer;