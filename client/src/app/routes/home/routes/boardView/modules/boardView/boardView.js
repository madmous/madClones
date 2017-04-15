const CLOSE_CREATE_CARD_FORM = 'CLOSE_CREATE_CARD_FORM';
const OPEN_CREATE_CARD_FORM = 'OPEN_CREATE_CARD_FORM';

const CLOSE_UPDATE_BOARD_NAME_FORM = 'CLOSE_UPDATE_BOARD_NAME_FORM';
const OPEN_UPDATE_BOARD_NAME_FORM = 'OPEN_UPDATE_BOARD_NAME_FORM';

const FOCUS_CREATE_CARD_FORM = 'FOCUS_CREATE_CARD_FORM';
const BLUR_CREATE_CARD_FORM = 'BLUR_CREATE_CARD_FORM';

const FOCUS_ON_UPDATE_BOARD_NAME_FORM = 'FOCUS_ON_UPDATE_BOARD_NAME_FORM';
const BLUR_ON_UPDATE_BOARD_NAME_FORM = 'BLUR_ON_UPDATE_BOARD_NAME_FORM';

const initialState = {
  isFocusOnCreateCardForm: false,
  isCreateCardFormOpen: false,

  isFocusOnUpdateBoardNameForm: false,
  isUpdateBoardNameOpen: false
}

export function openCreateCardForm () {
  return {
    type: OPEN_CREATE_CARD_FORM
  };
}

export function closeCreateCardForm () {
  return {
    type: CLOSE_CREATE_CARD_FORM
  };
}

export function openUpdateBoardNameForm () {
  return {
    type: OPEN_UPDATE_BOARD_NAME_FORM
  };
}

export function closeUpdateBoardNameForm () {
  return {
    type: CLOSE_UPDATE_BOARD_NAME_FORM
  };
}

export function focusOnUpdateBoardNameForm() {
  return {
    type: FOCUS_ON_UPDATE_BOARD_NAME_FORM,
  };
}

export function blurOnUpdateBoardNameForm() {
  return {
    type: BLUR_ON_UPDATE_BOARD_NAME_FORM,
  };
}

export function focusOnBoard() {
  return {
    type: FOCUS_CREATE_CARD_FORM,
  };
}

export function blurOnBoard() {
  return {
    type: BLUR_CREATE_CARD_FORM,
  };
}

export default function boardView(state = initialState, action) {
  switch (action.type) {
    case OPEN_CREATE_CARD_FORM:
      return Object.assign({}, state, {
        isCreateCardFormOpen: true
      });
    case CLOSE_CREATE_CARD_FORM:
      return Object.assign({}, state, {
        isCreateCardFormOpen: false
      });
    case OPEN_UPDATE_BOARD_NAME_FORM:
      return Object.assign({}, state, {
        isUpdateBoardNameOpen: true
      });
    case CLOSE_UPDATE_BOARD_NAME_FORM:
      return Object.assign({}, state, {
        isUpdateBoardNameOpen: false
      });
    case FOCUS_CREATE_CARD_FORM:
			return Object.assign({}, state, {
				isFocusOnCreateCardForm: true
			});
		case BLUR_CREATE_CARD_FORM:
			return Object.assign({}, state, {
				isFocusOnCreateCardForm: false
			});
    case FOCUS_ON_UPDATE_BOARD_NAME_FORM:
			return Object.assign({}, state, {
				isFocusOnUpdateBoardNameForm: true
			});
		case BLUR_ON_UPDATE_BOARD_NAME_FORM:
			return Object.assign({}, state, {
				isFocusOnUpdateBoardNameForm: false
			});
    default: return state;
  }
}