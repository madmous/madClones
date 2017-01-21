import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { 
	organization,
	starredBoard,
	notification,
	modals,
	board,
	user
} from '../app/routes/home/modules/index';

import signUp from '../app/routes/signUp/modules/signUp';
import login from '../app/routes/login/modules/login';

import { popOver } from '../app/modules/index';

const rootReducer = combineReducers({
	organization,
	starredBoard,
	notification,
	modals,
	board,
	user,

	signUp,
	login,

	popOver,

	form: formReducer,
	routing: routerReducer
})

export default rootReducer;