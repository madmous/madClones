import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import organization from '../routes/Home/Home/modules/organization'
import starredBoard from '../routes/Home/Home/modules/starredBoard'
import notification from '../routes/Home/Home/modules/notification'
import modals from '../routes/Home/Home/modules/modals'
import board from '../routes/Home/Home/modules/board'
import user from '../routes/Home/Home/modules/user'

import login from '../routes/Login/Login/modules/login'

import signUp from '../routes/SignUp/SignUp/modules/signUp'

const rootReducer = combineReducers({
	organization,
	starredBoard,
	notification,
	modals,
	board,
	user,

	login,

	signUp,

	form: formReducer,
	routing: routerReducer
})

export default rootReducer;