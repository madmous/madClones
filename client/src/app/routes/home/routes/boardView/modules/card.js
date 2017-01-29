import { reset } from 'redux-form';

import { logoutUser } from '../../../../login/modules/login';
import { url } from '../../../../../../utils/url';

const OPEN_CREATE_CARD_ITEM_FORM = 'OPEN_CREATE_CARD_ITEM_FORM';
const CLOSE_CREATE_CARD_ITEM_FORM = 'CLOSE_CREATE_CARD_ITEM_FORM';

const FOCUS_CREATE_CARD_ITEM_FORM = 'FOCUS_CREATE_CARD_ITEM_FORM';
const BLUR_CREATE_CARD_ITEM_FORM = 'BLUR_CREATE_CARD_ITEM_FORM';
const MOVE_CARD = 'MOVE_CARD';

const LOAD_CARDS_REQUEST = 'LOAD_CARDS_REQUEST';
const LOAD_CARDS_SUCCESS = 'LOAD_CARDS_SUCCESS';
const LOAD_CARDS_FAIL = 'LOAD_CARDS_FAIL';

const SAVE_CARD_REQUEST = 'SAVE_CARD_REQUEST';
const SAVE_CARD_SUCCESS = 'SAVE_CARD_SUCCESS';
const SAVE_CARD_FAIL = 'SAVE_CARD_FAIL';

const SAVE_CARD_ITEM_REQUEST = 'SAVE_CARD_ITEM_REQUEST';
const SAVE_CARD_ITEM_SUCCESS = 'SAVE_CARD_ITEM_SUCCESS';
const SAVE_CARD_ITEM_FAIL = 'SAVE_CARD_ITEM_FAIL';

const UPDATE_CARDS = 'UPDATE_CARDS';
const RESET_CARDS = 'RESET_CARDS';

const initialState = {
  isFocusOnCreateCardItemForm: false,
  createCardFormIndexToOpen: 0,
  isCreateCardItemFormOpen: false,
  cards: [],

  errorMessage: '',
  pathname:'',

  isFetchingCardsSuccessful: false,
  isFetchingCards: false,
  isFetching: false,

  isSavingCardSuccessful: false,
  isSavingCardRequest: false,
  isSavingCard: false,

  isSavingCardItemSuccessful: false,
  isSavingCardItemRequest: false,
  isSavingCardItem: false,
}

function loadCardsRequest(payload) {
  return {
    type: LOAD_CARDS_REQUEST,
    payload
  }
}

function loadCardsSuccess() {
  return {
    type: LOAD_CARDS_SUCCESS
  }
}

function loadCardsFail(payload) {
  return {
    type: LOAD_CARDS_FAIL,
    payload
  }
}

function saveCardRequest() {
  return {
    type: SAVE_CARD_REQUEST
  }
}

function saveCardSuccess() {
  return {
    type: SAVE_CARD_SUCCESS
  }
}

function saveCardFail(payload) {
  return {
    type: SAVE_CARD_FAIL,
    payload
  }
}

function saveCardItemRequest() {
  return {
    type: SAVE_CARD_ITEM_REQUEST
  }
}

function saveCardItemSuccess() {
  return {
    type: SAVE_CARD_ITEM_SUCCESS
  }
}

function saveCardItemFail(payload) {
  return {
    type: SAVE_CARD_ITEM_FAIL,
    payload
  }
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

export function moveCard(lastX, lastY, nextX, nextY) {
  return {
    type: MOVE_CARD, 
    lastX, 
    lastY, 
    nextX, 
    nextY 
  };
}

export function updateCards(payload) {
  return {
		type: UPDATE_CARDS,
		payload
	}
}

export function resetCards() {
  return {
		type: RESET_CARDS
	}
}

export function getCards(pathname) {
  return dispatch => {
    dispatch(loadCardsRequest(pathname))

    return fetch(url + `api/v1` + pathname, 
      { method: 'GET',
        headers: {
          'Authorization': 'JWT ' + localStorage.getItem('userId')
        },
      })
      .then(response => {
        if (response.status === 401) {
          dispatch(logoutUser());
        } else {
          return response.json();
        }
      })
      .then(json => {
        const jsonData = json.data;

        if (jsonData.uiError || jsonData.error) {
          dispatch(loadCardsFail(jsonData))
        } else {
          dispatch(loadCardsSuccess());
          dispatch(updateCards(jsonData))
        }
      })
  }
}

export function saveCard(pathname, cardName) {
  return dispatch => {
    dispatch(saveCardRequest())

    return fetch(url + `api/v1` + pathname + '/cards', 
      { method: 'POST', 
        body: JSON.stringify({
          name: cardName
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'JWT ' + localStorage.getItem('userId')
        },
      })
      .then(response => {
        if (response.status === 401) {
          dispatch(logoutUser());
        } else {
          return response.json();
        }
      })
      .then(json => {
        const jsonData = json.data;

        if (jsonData.uiError || jsonData.error) {
          dispatch(saveCardFail(jsonData))
        } else {
          dispatch(saveCardSuccess());
          dispatch(reset('createCardForm'));
          dispatch(updateCards(jsonData))
        }
      })
  }
}

export function saveCardItem(pathname, cardId, cardItemName) {
  return dispatch => {
    dispatch(saveCardItemRequest())

    return fetch(url + `api/v1` + pathname + `/cards/${cardId}`, 
      { method: 'POST', 
        body: JSON.stringify({
          name: cardItemName
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'JWT ' + localStorage.getItem('userId')
        },
      })
      .then(response => {
        if (response.status === 401) {
          dispatch(logoutUser());
        } else {
          return response.json();
        }
      })
      .then(json => {
        const jsonData = json.data;

        if (jsonData.uiError || jsonData.error) {
          dispatch(saveCardItemFail(jsonData))
        } else {
          dispatch(saveCardItemSuccess());
          dispatch(reset('createCardItemForm'));
          dispatch(updateCards(jsonData))
        }
      })
  }
}

export default function boardView(state = initialState, action) {
  switch (action.type) {
    case LOAD_CARDS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        pathname: action.payload
      })
    case LOAD_CARDS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingCardsSuccessful: true,
        isFetchingCards: false
      })
    case LOAD_CARDS_FAIL:
      return Object.assign({}, state, {
        isFetchingCardsSuccessful: false,
        isFetchingCards: false,
        errorMessage: action.payload.error,

        cards: []
      })
    case SAVE_CARD_REQUEST:
      return Object.assign({}, state, {
        isSavingCard: true,
      })
    case SAVE_CARD_SUCCESS:
      return Object.assign({}, state, {
        isSavinCardSuccessful: true,
        isSavingCard: false
      })
    case SAVE_CARD_FAIL:
      return Object.assign({}, state, {
        isSavinCardSuccessful: false,
        errorMessage: action.payload.error,
        isSavingCard: false
      })
    case SAVE_CARD_ITEM_REQUEST:
      return Object.assign({}, state, {
        isSavingCardItem: true,
      })
    case SAVE_CARD_ITEM_SUCCESS:
      return Object.assign({}, state, {
        isSavinCardItemSuccessful: true,
        isSavingCardItem: false
      })
    case SAVE_CARD_ITEM_FAIL:
      return Object.assign({}, state, {
        isSavinCardItemSuccessful: false,
        isSavingCardItem: false,
        errorMessage: action.payload.error
      })
    case UPDATE_CARDS:
			return Object.assign({}, state, {
				cards: action.payload
			})
    case RESET_CARDS:
			return Object.assign({}, state, {
				cards: []
			})
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
    case MOVE_CARD: {
      const newCards = [...state.cards];
      const { lastX, lastY, nextX, nextY } = action;

      if (lastX === nextX) {
        newCards[lastX].cardItems.splice(nextY, 0, newCards[lastX].cardItems.splice(lastY, 1)[0]);
      } else {
        newCards[nextX].cardItems.splice(nextY, 0, newCards[lastX].cardItems[lastY]);
        newCards[lastX].cardItems.splice(lastY, 1);
      }

      return Object.assign({}, state, {
				cards: newCards
			})
    }
    default: return state;
  }
}