import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import organization from '../pages/home/Home/modules/organization'
import starredBoard from '../pages/home/Home/modules/starredBoard'
import notification from '../pages/home/Home/modules/notification'
import popOver from '../pages/home/Home/modules/popOver'
import modals from '../pages/home/Home/modules/modals'
import board from '../pages/home/Home/modules/board'
import user from '../pages/home/Home/modules/user'

import login from '../pages/login/Login/modules/login'

import signUp from '../pages/signup/SignUp/modules/signUp'

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