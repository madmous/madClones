import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import organization from '../routes/home/Home/modules/organization'
import starredBoard from '../routes/home/Home/modules/starredBoard'
import notification from '../routes/home/Home/modules/notification'
import modals from '../routes/home/Home/modules/modals'
import board from '../routes/home/Home/modules/board'
import user from '../routes/home/Home/modules/user'

import login from '../routes/login/Login/modules/login'

import signUp from '../routes/signUp/SignUp/modules/signUp'

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