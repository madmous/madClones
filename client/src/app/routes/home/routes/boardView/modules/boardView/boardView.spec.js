import * as boardViewActions from './boardView';
import reducer from './boardView';

describe('boardView actions', () => {
  it('should create openCreateCardForm action', () => {
    const expectedAction = {
      type: 'OPEN_CREATE_CARD_FORM'
    };

    expect(boardViewActions.openCreateCardForm()).toEqual(expectedAction)
  })

  it('should create closeCreateCardForm action', () => {
    const expectedAction = {
      type: 'CLOSE_CREATE_CARD_FORM'
    };

    expect(boardViewActions.closeCreateCardForm()).toEqual(expectedAction)
  })

  it('should create focusOnBoard action', () => {
    const expectedAction = {
      type: 'FOCUS_CREATE_CARD_FORM'
    };

    expect(boardViewActions.focusOnBoard()).toEqual(expectedAction)
  })

  it('should create blurOnBoard action', () => {
    const expectedAction = {
      type: 'BLUR_CREATE_CARD_FORM'
    };

    expect(boardViewActions.blurOnBoard()).toEqual(expectedAction)
  })
})

describe('boardView reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
        isFocusOnCreateCardForm: false,
        isCreateCardFormOpen: false,

        isFocusOnUpdateBoardNameForm: false,
        isUpdateBoardNameOpen: false
      }
    )
  })

  it('should handle OPEN_CREATE_CARD_FORM', () => {
    expect(
      reducer([], {
        type: 'OPEN_CREATE_CARD_FORM'
      })
    ).toEqual({
        isCreateCardFormOpen: true
      }
    )
  })

  it('should handle CLOSE_CREATE_CARD_FORM', () => {
    expect(
      reducer([], {
        type: 'CLOSE_CREATE_CARD_FORM'
      })
    ).toEqual({
        isCreateCardFormOpen: false
      }
    )
  })

  it('should handle OPEN_UPDATE_BOARD_NAME_FORM', () => {
    expect(
      reducer([], {
        type: 'OPEN_UPDATE_BOARD_NAME_FORM'
      })
    ).toEqual({
        isUpdateBoardNameOpen: true
      }
    )
  })

  it('should handle CLOSE_UPDATE_BOARD_NAME_FORM', () => {
    expect(
      reducer([], {
        type: 'CLOSE_UPDATE_BOARD_NAME_FORM'
      })
    ).toEqual({
        isUpdateBoardNameOpen: false
      }
    )
  })

  it('should handle FOCUS_CREATE_CARD_FORM', () => {
    expect(
      reducer([], {
        type: 'FOCUS_CREATE_CARD_FORM'
      })
    ).toEqual({
        isFocusOnCreateCardForm: true
      }
    )
  })

  it('should handle BLUR_CREATE_CARD_FORM', () => {
    expect(
      reducer([], {
        type: 'BLUR_CREATE_CARD_FORM'
      })
    ).toEqual({
        isFocusOnCreateCardForm: false
      }
    )
  })

  it('should handle FOCUS_ON_UPDATE_BOARD_NAME_FORM', () => {
    expect(
      reducer([], {
        type: 'FOCUS_ON_UPDATE_BOARD_NAME_FORM'
      })
    ).toEqual({
        isFocusOnUpdateBoardNameForm: true
      }
    )
  })

  it('should handle BLUR_ON_UPDATE_BOARD_NAME_FORM', () => {
    expect(
      reducer([], {
        type: 'BLUR_ON_UPDATE_BOARD_NAME_FORM'
      })
    ).toEqual({
        isFocusOnUpdateBoardNameForm: false
      }
    )
  })
})