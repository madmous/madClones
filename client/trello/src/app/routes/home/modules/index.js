import notification from './notification/notification';
import organization from './organization/organization';
import starredBoard from './starredBoard/starredBoard';
import modals from './modals/modals';
import board from './board/board';
import home from './home/home';

import * as starredBoardActionCreators from './starredBoard/starredBoard';
import * as notificationActionCreators from './notification/notification';
import * as organizationActionCreators from './organization/organization';
import * as modalActionCreators from './modals/modals';
import * as boardActionCreators from './board/board';
import * as formActionCreators from './forms/forms';
import * as homeActionCreators from './home/home';

export {
	starredBoardActionCreators,
	notificationActionCreators,
	organizationActionCreators,
	modalActionCreators,
	boardActionCreators,
	formActionCreators,
	homeActionCreators,

	notification,
	organization,
	starredBoard,
	modals,
	board,
	home
}