import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import authentication from './authentication'
import organization from './organization'
import starredBoard from './starredBoard'
import board from './board'
import user from './user'

const rootReducer = combineReducers({
  authentication,
  organization,
  starredBoard,
  board,
  form: formReducer,
  user
})

export default rootReducer;