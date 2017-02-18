import * as popOverActions from './popOver';
import reducer from './popOver';

describe('popOver actions', () => {
  it('should create show pop over action', () => {
    const expectedAction = {
      type: 'SHOW_POP_OVER'
    }

    expect(popOverActions.showPopOver()).toEqual(expectedAction)
  })

  it('should handle SHOW_POP_OVER', () => {
    expect(
      reducer([], {
        type: 'SHOW_POP_OVER'
      })
    ).toEqual({
        isPopOverOpen: true
      }
    )
  })

  it('should create hide pop over action', () => {
    const expectedAction = {
      type: 'HIDE_POP_OVER'
    }

    expect(popOverActions.hidePopOver()).toEqual(expectedAction)
  })

  it('should handle HIDE_POP_OVER', () => {
    expect(
      reducer([], {
        type: 'HIDE_POP_OVER'
      })
    ).toEqual({
        isPopOverOpen: false
      }
    )
  })

  it('should create focus on pop over action', () => {
    const expectedAction = {
      type: 'FOCUS_POP_HOVER'
    }

    expect(popOverActions.focusOnPopHover()).toEqual(expectedAction)
  })

  it('should handle FOCUS_POP_HOVER', () => {
    expect(
      reducer([], {
        type: 'FOCUS_POP_HOVER'
      })
    ).toEqual({
        isFocusOnPopHover: true
      }
    )
  })

  it('should create focus on pop over action', () => {
    const expectedAction = {
      type: 'BLUR_POP_HOVER'
    }
    
    expect(popOverActions.blurOnPopHover()).toEqual(expectedAction)
  })

  it('should handle BLUR_POP_HOVER', () => {
    expect(
      reducer([], {
        type: 'BLUR_POP_HOVER'
      })
    ).toEqual({
        isFocusOnPopHover: false
      }
    )
  })
})

describe('popOver reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
        isFocusOnPopHover: false,
        isPopOverOpen: false
      }
    )
  })
})