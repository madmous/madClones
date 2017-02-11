const CLOSE_CREATE_CARD_FORM = 'CLOSE_CREATE_CARD_FORM';
const OPEN_CREATE_CARD_FORM = 'OPEN_CREATE_CARD_FORM';

const FOCUS_CREATE_CARD_FORM = 'FOCUS_CREATE_CARD_FORM';
const BLUR_CREATE_CARD_FORM = 'BLUR_CREATE_CARD_FORM';

const initialState = {
  isFocusOnCreateCardForm: false,
  isCreateCardFormOpen: false
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
    case FOCUS_CREATE_CARD_FORM:
			return Object.assign({}, state, {
				isFocusOnCreateCardForm: true
			});
		case BLUR_CREATE_CARD_FORM:
			return Object.assign({}, state, {
				isFocusOnCreateCardForm: false
			});
    default: return state;
  }
}