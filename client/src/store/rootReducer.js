import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { 
	organization,
	starredBoard,
	notification,
	modals,
	board,
	home
} from '../app/routes/home/modules/index';

import { signUp } from '../app/routes/signUp/modules/index';
import { login } from '../app/routes/login/modules/index';

import { 
	boardsMenu,
	popOver, 
	app 
} from '../app/modules/index';

import { 
	boardView, 
	card 
} from '../app/routes/home/routes/boardView/modules/index';

const appReducer = combineReducers({
	organization,
	starredBoard,
	notification,
	modals,
	board,
	home,

	signUp,
	login,

	boardsMenu,
	popOver,
	app,

	boardView,
	card,

	form: formReducer,
	routing: routerReducer
})

const rootReducer = (state, action) => {
	if (action.type === 'UN_AUTHENTICATE_USER') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;