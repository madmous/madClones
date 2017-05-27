import { reset } from 'redux-form';
import fetch from 'isomorphic-fetch';

import { loginActionCreators } from '../../../../../login/modules/index';
import { trelloUrl } from '../../../../../../../utils/url';

import { 
  starredBoardActionCreators,
  organizationActionCreators,
  boardActionCreators
 } from '../../../../../home/modules/index.js';

const CLOSE_CREATE_CARD_ITEM_FORM = 'CLOSE_CREATE_CARD_ITEM_FORM';
const OPEN_CREATE_CARD_ITEM_FORM = 'OPEN_CREATE_CARD_ITEM_FORM';

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

const UPDATE_CARDS_REQUEST = 'UPDATE_CARDS_REQUEST';
const UPDATE_CARDS_SUCCESS = 'UPDATE_CARDS_SUCCESS';
const UPDATE_CARDS_FAIL = 'UPDATE_CARDS_FAIL';

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

  isSavingCardSuccessful: false,
  isSavingCard: false,

  isSavingCardItemSuccessful: false,
  isSavingCardItem: false,

  isUpdatingCardsSuccessful: false,
  isUpdatingCards: false,
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

function updateCardsRequest() {
  return {
		type: UPDATE_CARDS_REQUEST
	}
}

function updateCardsSuccess() {
  return {
		type: UPDATE_CARDS_SUCCESS
	}
}

function updateCardsFail(payload) {
  return {
		type: UPDATE_CARDS_FAIL,
    payload
	}
}

function moveCard(previousAndNextPositions) {
  return {
    type: MOVE_CARD, 
    ...previousAndNextPositions
  };
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

export function moveCardItemAndUpdateCards(previousAndNextPositions, cards, pathname) {
  return dispatch => {
    dispatch(moveCard(previousAndNextPositions));
    dispatch(updateCardsRequest());
    
    return fetch(`${trelloUrl}api${pathname}/cards`, 
      { method: 'PUT',
        body: JSON.stringify({
          cards
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'csrf': localStorage.getItem('csrf')
        },
        credentials: 'include'
      })
      .then(response => {
        if (response.status === 401) {
          dispatch(loginActionCreators.logoutUser());
        } else {
          return response.json();
        }
      })
      .then(json => {
        if (json.uiError || json.error) {
          dispatch(updateCardsFail(json))
        } else {
          dispatch(updateCardsSuccess());
        }
      })
  }
}

export function getCards(pathname) {
  return dispatch => {
    dispatch(loadCardsRequest(pathname))

    return fetch(`${trelloUrl}api${pathname}/cards`, 
      { method: 'GET',
        headers: {
          'csrf': localStorage.getItem('csrf')
        },
        credentials: 'include'
      })
      .then(response => {
        if (response.status === 401) {
          dispatch(loginActionCreators.logoutUser());
        } else {
          return response.json();
        }
      })
      .then(json => {
        if (json.uiError || json.error) {
          dispatch(loadCardsFail(json))
        } else {
          const jsonData = json.data;

          dispatch(loadCardsSuccess());
          dispatch(organizationActionCreators.updateOrganizations(jsonData));
          dispatch(starredBoardActionCreators.updateStarredBoards(jsonData));
          dispatch(boardActionCreators.updateBoards(jsonData));
          dispatch(updateCards(jsonData));
        }
      })
  }
}

export function saveCard(pathname, cardName) {
  return dispatch => {
    dispatch(saveCardRequest())

    return fetch(`${trelloUrl}api${pathname}/cards`, 
      { method: 'POST', 
        body: JSON.stringify({
          name: cardName
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'csrf': localStorage.getItem('csrf')
        },
        credentials: 'include'
      })
      .then(response => {
        if (response.status === 401) {
          dispatch(loginActionCreators.logoutUser());
        } else {
          return response.json();
        }
      })
      .then(json => {
        if (json.uiError || json.error) {
          dispatch(saveCardFail(json))
        } else {
          dispatch(saveCardSuccess());
          dispatch(reset('createCardForm'));
          dispatch(updateCards(json.data));
        }
      })
  }
}

export function saveCardItem(pathname, cardId, cardItemName) {
  return dispatch => {
    dispatch(saveCardItemRequest())

    return fetch(`${trelloUrl}api${pathname}/cards/${cardId}`, 
      { method: 'POST', 
        body: JSON.stringify({
          name: cardItemName
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'csrf': localStorage.getItem('csrf')
        },
        credentials: 'include'
      })
      .then(response => {
        if (response.status === 401) {
          dispatch(loginActionCreators.logoutUser());
        } else {
          return response.json();
        }
      })
      .then(json => {
        if (json.uiError || json.error) {
          dispatch(saveCardItemFail(json))
        } else {
          dispatch(closeCreateCardItemForm());
          dispatch(saveCardItemSuccess());
          dispatch(reset('createCardItemForm'));
          dispatch(updateCards(json.data))
        }
      })
  }
}

export default function boardView(state = initialState, action) {
  switch (action.type) {
    case LOAD_CARDS_REQUEST:
      return Object.assign({}, state, {
        isFetchingCards: true,
        pathname: action.payload
      });
    case LOAD_CARDS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingCardsSuccessful: true,
        isFetchingCards: false
      });
    case LOAD_CARDS_FAIL:
      return Object.assign({}, state, {
        isFetchingCardsSuccessful: false,
        isFetchingCards: false,

        errorMessage: action.payload.error,
        cards: []
      });
    case UPDATE_CARDS_REQUEST:
      return Object.assign({}, state, {
        isUpdatingCards: true
      });
    case UPDATE_CARDS_SUCCESS:
      return Object.assign({}, state, {
        isUpdatingCardsSuccessful: true,
        isUpdatingCards: false
      });
    case UPDATE_CARDS_FAIL:
      return Object.assign({}, state, {
        isUpdatingCardsSuccessful: false,
        isUpdatingCards: false,

        errorMessage: action.payload.error
      });
    case SAVE_CARD_REQUEST:
      return Object.assign({}, state, {
        isSavingCard: true,
      });
    case SAVE_CARD_SUCCESS:
      return Object.assign({}, state, {
        isSavinCardSuccessful: true,
        isSavingCard: false
      });
    case SAVE_CARD_FAIL:
      return Object.assign({}, state, {
        isSavinCardSuccessful: false,
        isSavingCard: false,

        errorMessage: action.payload.error,
      });
    case SAVE_CARD_ITEM_REQUEST:
      return Object.assign({}, state, {
        isSavingCardItem: true,
      });
    case SAVE_CARD_ITEM_SUCCESS:
      return Object.assign({}, state, {
        isSavinCardItemSuccessful: true,
        isSavingCardItem: false
      });
    case SAVE_CARD_ITEM_FAIL:
      return Object.assign({}, state, {
        isSavinCardItemSuccessful: false,
        isSavingCardItem: false,
        
        errorMessage: action.payload.error
      });
    case UPDATE_CARDS:
			return Object.assign({}, state, {
				cards: action.payload.cards
			});
    case RESET_CARDS:
			return Object.assign({}, state, {
				cards: []
			});
    case OPEN_CREATE_CARD_ITEM_FORM:
      return Object.assign({}, state, {
        createCardFormIndexToOpen: action.payload,
        isCreateCardItemFormOpen: true
      });
    case CLOSE_CREATE_CARD_ITEM_FORM:
      return Object.assign({}, state, {
        createCardFormIndexToOpen: 0,
        isCreateCardItemFormOpen: false
      });
    case FOCUS_CREATE_CARD_ITEM_FORM:
			return Object.assign({}, state, {
				isFocusOnCreateCardItemForm: true
			});
		case BLUR_CREATE_CARD_ITEM_FORM:
			return Object.assign({}, state, {
				isFocusOnCreateCardItemForm: false
			});
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
			});
    }
    default: return state;
  }
}