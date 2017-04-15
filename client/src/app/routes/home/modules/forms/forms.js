import { boardViewActionCreators } from '../../routes/boardView/modules/index';

const CLOSE_ALL_FORMS = 'CLOSE_ALL_FORMS';

function closeAll() {
	return {
		type: CLOSE_ALL_FORMS
	};
}

export function closeAllForms() {
	return dispatch => {
		dispatch(closeAll());
		dispatch(boardViewActionCreators.closeUpdateBoardNameForm());
	}
}