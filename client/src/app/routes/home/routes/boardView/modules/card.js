const OPEN_CREATE_CARD_ITEM_FORM = 'OPEN_CREATE_CARD_ITEM_FORM';
const CLOSE_CREATE_CARD_ITEM_FORM = 'CLOSE_CREATE_CARD_ITEM_FORM';

const FOCUS_CREATE_CARD_ITEM_FORM = 'FOCUS_CREATE_CARD_ITEM_FORM';
const BLUR_CREATE_CARD_ITEM_FORM = 'BLUR_CREATE_CARD_ITEM_FORM';

const initialState = {
  isFocusOnCreateCardItemForm: false,
  createCardFormIndexToOpen: 0,
  isCreateCardItemFormOpen: false
}

export function openCreateCardItemForm (payload) {
  return {
    type: OPEN_CREATE_CARD_ITEM_FORM,
    payload
  }
}

export function closeCreateCardItemForm () {
  return {
    type: CLOSE_CREATE_CARD_ITEM_FORM
  }
}

export function focusOnCardItemForm() {
  return {
    type: FOCUS_CREATE_CARD_ITEM_FORM,
  }
}

export function blurOnCardItemForm() {
  return {
    type: BLUR_CREATE_CARD_ITEM_FORM,
  }
}

export default function boardView(state = initialState, action) {
  switch (action.type) {
    case OPEN_CREATE_CARD_ITEM_FORM:
      return Object.assign({}, state, {
        createCardFormIndexToOpen: action.payload,
        isCreateCardItemFormOpen: true
      })
    case CLOSE_CREATE_CARD_ITEM_FORM:
      return Object.assign({}, state, {
        createCardFormIndexToOpen: 0,
        isCreateCardItemFormOpen: false
      })
    case FOCUS_CREATE_CARD_ITEM_FORM:
			return Object.assign({}, state, {
				isFocusOnCreateCardItemForm: true
			})
		case BLUR_CREATE_CARD_ITEM_FORM:
			return Object.assign({}, state, {
				isFocusOnCreateCardItemForm: false
			})
    default: return state;
  }
}