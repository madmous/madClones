import * as boardsMenuActions from './boardsMenu';
import reducer from './boardsMenu';

describe('boardsMenu reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
        isFocusOnBoardsMenu: false,
        isBoardsMenuOpen: false
      }
    )
  })
})

describe('boardsMenu actions', () => {
  describe('BOARDS_MENU', () => {
    it('should create openBoardsMenu action', () => {
      const expectedAction = {
        type: 'OPEN_BOARDS_MENU'
      };

      expect(boardsMenuActions.openBoardsMenu()).toEqual(expectedAction)
    })

    it('should handle OPEN_BOARDS_MENU', () => {
      expect(
        reducer([], {
          type: 'OPEN_BOARDS_MENU'
        })
      ).toEqual({
          isBoardsMenuOpen: true
        }
      )
    })

    it('should create hideBoardsMenu action', () => {
      const expectedAction = {
        type: 'HIDE_BOARDS_MENU'
      };

      expect(boardsMenuActions.hideBoardsMenu()).toEqual(expectedAction)
    })

    it('should handle HIDE_BOARDS_MENU', () => {
      expect(
        reducer([], {
          type: 'HIDE_BOARDS_MENU'
        })
      ).toEqual({
          isBoardsMenuOpen: false
        }
      )
    })

    it('should create focusOnBoardsMenu action', () => {
    const expectedAction = {
      type: 'FOCUS_BOARDS_MENU'
    }

    expect(boardsMenuActions.focusOnBoardsMenu()).toEqual(expectedAction)
  })

  it('should handle FOCUS_BOARDS_MENU', () => {
    expect(
      reducer([], {
        type: 'FOCUS_BOARDS_MENU'
      })
    ).toEqual({
        isFocusOnBoardsMenu: true
      }
    )
  })

  it('should create blurOnBoardsMenu action', () => {
    const expectedAction = {
      type: 'BLUR_BOARDS_MENU'
    }
    
    expect(boardsMenuActions.blurOnBoardsMenu()).toEqual(expectedAction)
  })

  it('should handle BLUR_BOARDS_MENU', () => {
    expect(
      reducer([], {
        type: 'BLUR_BOARDS_MENU'
      })
    ).toEqual({
        isFocusOnBoardsMenu: false
      }
    )
  })
  })
})