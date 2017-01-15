import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import organization from '../app/home/Home/modules/organization'
import starredBoard from '../app/home/Home/modules/starredBoard'
import notification from '../app/home/Home/modules/notification'
import popOver from '../app/home/Home/modules/popOver'
import modals from '../app/home/Home/modules/modals'
import board from '../app/home/Home/modules/board'
import user from '../app/home/Home/modules/user'

import login from '../app/login/Login/modules/login'

import signUp from '../app/signup/SignUp/modules/signUp'

const rootReducer = combineReducers({
	organization,
	starredBoard,
	notification,
	popOver,
	modals,
	board,
	user,

	login,

	signUp,

	form: formReducer,
	routing: routerReducer
})

export default rootReducer;