import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as cardActions from './card';

import reducer from './card';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('card actions', () => {
  it('should create openCreateCardItemForm action', () => {
    const payload = {};
    const expectedAction = {
      type: 'OPEN_CREATE_CARD_ITEM_FORM',
      payload
    };

    expect(cardActions.openCreateCardItemForm(payload)).toEqual(expectedAction);
  })

  it('should create closeCreateCardItemForm action', () => {
    const expectedAction = {
      type: 'CLOSE_CREATE_CARD_ITEM_FORM'
    };

    expect(cardActions.closeCreateCardItemForm()).toEqual(expectedAction);
  })

  it('should create focusOnCardItemForm action', () => {
    const expectedAction = {
      type: 'FOCUS_CREATE_CARD_ITEM_FORM'
    };

    expect(cardActions.focusOnCardItemForm()).toEqual(expectedAction);
  })

  it('should create blurOnCardItemForm action', () => {
    const expectedAction = {
      type: 'BLUR_CREATE_CARD_ITEM_FORM'
    };

    expect(cardActions.blurOnCardItemForm()).toEqual(expectedAction);
  })

  it('should create updateCards action', () => {
    const payload = {};
    const expectedAction = {
      type: 'UPDATE_CARDS',
      payload
    };

    expect(cardActions.updateCards(payload)).toEqual(expectedAction);
  })

  it('should create resetCards action', () => {
    const expectedAction = {
      type: 'RESET_CARDS'
    };

    expect(cardActions.resetCards()).toEqual(expectedAction);
  })

  xit('should create an action to getCards - success', () => {
    const data = {
      organizations: [],
      starredBoards: [],
      boards: [],
      cards: [],
    };

    const pathName = '/pathName';

    const expectedActions = [
      { 
        type: 'LOAD_CARDS_REQUEST',
        payload: pathName
      },
      { type: 'LOAD_CARDS_SUCCESS' },
      {
        type: 'UPDATE_ORGANIZATIONS',
        payload: data
      },
      {
        type: 'UPDATE_STARRED_BOARDS',
        payload: data
      },
      {
        type: 'UPDATE_BOARDS',
        payload: data
      },
      {
        type: 'UPDATE_CARDS',
        payload: data
      }
    ];

    const store = mockStore();

    nock('http://localhost:3001', { 
      reqheaders: {
        'authorization': 'JWT ' + localStorage.getItem('userId') 
      }
    })
    .get(`/api/v1${pathName}/cards`)
    .reply(200, { data });

    return store.dispatch(cardActions.getCards(pathName))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }
    );
  })

  xit('should create an action to getCards - fail', () => {
    const data = {
      error: 'Error',
    };

    const pathName = '/pathName';

    const expectedActions = [
      { 
        type: 'LOAD_CARDS_REQUEST',
        payload: pathName
      },
      {
        type: 'LOAD_CARDS_FAIL',
        payload: data
      }
    ];

    const store = mockStore();

    nock('http://localhost:3001', { 
      reqheaders: {
        'authorization': 'JWT ' + localStorage.getItem('userId') 
      }
    })
    .get(`/api/v1${pathName}/cards`)
    .reply(400, data);

    return store.dispatch(cardActions.getCards(pathName))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }
    );
  })

  it('should create an action to saveCard - success', () => {
    const data = {
      cards: [],
    };

    const pathName = '/pathName';
    const cardName = 'cardName';

    const expectedActions = [
      { type: 'SAVE_CARD_REQUEST' },
      { type: 'SAVE_CARD_SUCCESS' },
      { 
        type: '@@redux-form/RESET', 
        meta: {
          form: 'createCardForm'
        } 
      },
      {
        type: 'UPDATE_CARDS',
        payload: data
      }
    ];

    const store = mockStore();

    nock(`http://localhost:3001/api/v1${pathName}/cards`, {
      body: JSON.stringify({
        name: cardName
      })}, { 
      reqheaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': 'JWT ' + localStorage.getItem('userId')
      }
    })
    .post('')
    .reply(200, { data });

    return store.dispatch(cardActions.saveCard(pathName, cardName))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }
    );
  })

  it('should create an action to saveCard - fail', () => {
    const data = {
      error: 'Error'
    };

    const pathName = '/pathName';
    const cardName = 'cardName';

    const expectedActions = [
      { type: 'SAVE_CARD_REQUEST' },
      {
        type: 'SAVE_CARD_FAIL',
        payload: data
      }
    ];

    const store = mockStore();

    nock(`http://localhost:3001/api/v1${pathName}/cards`, {
      body: JSON.stringify({
        name: cardName
      })}, { 
      reqheaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': 'JWT ' + localStorage.getItem('userId')
      }
    })
    .post('')
    .reply(400, data);

    return store.dispatch(cardActions.saveCard(pathName, cardName))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }
    );
  })

  it('should create an action to saveCardItem - success', () => {
    const data = {
      cards: [],
    };

    const cardItemName = 'cardItemName';
    const pathName = '/pathName';
    const cardId = 'cardId';

    const expectedActions = [
      { type: 'SAVE_CARD_ITEM_REQUEST' },
      { type: 'CLOSE_CREATE_CARD_ITEM_FORM' },
      { type: 'SAVE_CARD_ITEM_SUCCESS' },
      { 
        type: '@@redux-form/RESET', 
        meta: {
          form: 'createCardItemForm'
        } 
      },
      {
        type: 'UPDATE_CARDS',
        payload: data
      }
    ];

    const store = mockStore();

    nock(`http://localhost:3001/api/v1${pathName}/cards/${cardId}`, {
      body: JSON.stringify({
        name: cardItemName
      })}, { 
      reqheaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': 'JWT ' + localStorage.getItem('userId')
      }
    })
    .post('')
    .reply(200, { data });

    return store.dispatch(cardActions.saveCardItem(pathName, cardId, cardItemName))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }
    );
  })

  it('should create an action to saveCardItem - fail', () => {
    const data = {
      error: 'Error'
    };

    const cardItemName = 'cardItemName';
    const pathName = '/pathName';
    const cardId = 'cardId';

    const expectedActions = [
      { type: 'SAVE_CARD_ITEM_REQUEST' },
      {
        type: 'SAVE_CARD_ITEM_FAIL',
        payload: data
      }
    ];

    const store = mockStore();

    nock(`http://localhost:3001/api/v1${pathName}/cards/${cardId}`, {
      body: JSON.stringify({
        name: cardItemName
      })}, { 
      reqheaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': 'JWT ' + localStorage.getItem('userId')
      }
    })
    .post('')
    .reply(400, data);

    return store.dispatch(cardActions.saveCardItem(pathName, cardId, cardItemName))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }
    );
  })
})

describe('card reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
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
    )
  })

  it('should handle LOAD_CARDS_REQUEST', () => {
    const payload = '/pathname'

    expect(
      reducer([], {
        type: 'LOAD_CARDS_REQUEST',
        payload
      })
    ).toEqual({
        isFetchingCards: true,
        pathname: payload
      }
    )
  })

  it('should handle LOAD_CARDS_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'LOAD_CARDS_SUCCESS'
      })
    ).toEqual({
        isFetchingCardsSuccessful: true,
        isFetchingCards: false
      }
    )
  })

  it('should handle LOAD_CARDS_FAIL', () => {
    const payload = {
      error: 'Lord cards request failed'
    };

    expect(
      reducer([], {
        type: 'LOAD_CARDS_FAIL',
        payload
      })
    ).toEqual({
        isFetchingCardsSuccessful: false,
        isFetchingCards: false,

        errorMessage: payload.error,
        cards: []
      }
    )
  })

  it('should handle UPDATE_CARDS_REQUEST', () => {
    expect(
      reducer([], {
        type: 'UPDATE_CARDS_REQUEST'
      })
    ).toEqual({
        isUpdatingCards: true
      }
    )
  })

  it('should handle UPDATE_CARDS_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'UPDATE_CARDS_SUCCESS'
      })
    ).toEqual({
        isUpdatingCardsSuccessful: true,
        isUpdatingCards: false
      }
    )
  })

  it('should handle UPDATE_CARDS_FAIL', () => {
    const payload = {
      error: 'Update cards request failed'
    };

    expect(
      reducer([], {
        type: 'UPDATE_CARDS_FAIL',
        payload
      })
    ).toEqual({
        isUpdatingCardsSuccessful: false,
        isUpdatingCards: false,

        errorMessage: payload.error
      }
    )
  })

  it('should handle SAVE_CARD_REQUEST', () => {
    expect(
      reducer([], {
        type: 'SAVE_CARD_REQUEST'
      })
    ).toEqual({
        isSavingCard: true
      }
    )
  })

  it('should handle SAVE_CARD_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'SAVE_CARD_SUCCESS'
      })
    ).toEqual({
        isSavinCardSuccessful: true,
        isSavingCard: false
      }
    )
  })

  it('should handle SAVE_CARD_FAIL', () => {
    const payload = {
      error: 'Save cards request failed'
    };

    expect(
      reducer([], {
        type: 'SAVE_CARD_FAIL',
        payload
      })
    ).toEqual({
        isSavinCardSuccessful: false,
        isSavingCard: false,

        errorMessage: payload.error,
      }
    )
  })

  it('should handle SAVE_CARD_ITEM_REQUEST', () => {
    expect(
      reducer([], {
        type: 'SAVE_CARD_ITEM_REQUEST'
      })
    ).toEqual({
        isSavingCardItem: true
      }
    )
  })

  it('should handle SAVE_CARD_ITEM_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'SAVE_CARD_ITEM_SUCCESS'
      })
    ).toEqual({
        isSavinCardItemSuccessful: true,
        isSavingCardItem: false
      }
    )
  })

  it('should handle SAVE_CARD_ITEM_FAIL', () => {
    const payload = {
      error: 'Save card item request failed'
    };

    expect(
      reducer([], {
        type: 'SAVE_CARD_ITEM_FAIL',
        payload
      })
    ).toEqual({
        isSavinCardItemSuccessful: false,
        isSavingCardItem: false,
        
        errorMessage: payload.error
      }
    )
  })

  it('should handle UPDATE_CARDS', () => {
    const payload = {
      cards: [{
        _id: '1',
        cardItems: [],
        header: "cardHeader"
      }]
    };

    expect(
      reducer([], {
        type: 'UPDATE_CARDS',
        payload
      })
    ).toEqual({
        cards: payload.cards
      }
    )
  })

  it('should handle RESET_CARDS', () => {
    expect(
      reducer([], {
        type: 'RESET_CARDS'
      })
    ).toEqual({
        cards: []
      }
    )
  })

  it('should handle OPEN_CREATE_CARD_ITEM_FORM', () => {
    const payload = 0;

    expect(
      reducer([], {
        type: 'OPEN_CREATE_CARD_ITEM_FORM',
        payload
      })
    ).toEqual({
        createCardFormIndexToOpen: payload,
        isCreateCardItemFormOpen: true
      }
    )
  })

  it('should handle CLOSE_CREATE_CARD_ITEM_FORM', () => {
    expect(
      reducer([], {
        type: 'CLOSE_CREATE_CARD_ITEM_FORM'
      })
    ).toEqual({
        createCardFormIndexToOpen: 0,
        isCreateCardItemFormOpen: false
      }
    )
  })

  it('should handle FOCUS_CREATE_CARD_ITEM_FORM', () => {
    expect(
      reducer([], {
        type: 'FOCUS_CREATE_CARD_ITEM_FORM'
      })
    ).toEqual({
        isFocusOnCreateCardItemForm: true
      }
    )
  })

  it('should handle BLUR_CREATE_CARD_ITEM_FORM', () => {
    expect(
      reducer([], {
        type: 'BLUR_CREATE_CARD_ITEM_FORM'
      })
    ).toEqual({
        isFocusOnCreateCardItemForm: false
      }
    )
  })
})