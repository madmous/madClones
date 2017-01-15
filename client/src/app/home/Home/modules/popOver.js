const SHOW_POP_OVER = 'SHOW_POP_OVER';
const HIDE_POP_OVER = 'HIDE_POP_OVER';

const BLUR_POP_HOVER = 'BLUR_POP_HOVER';
const FOCUS_POP_HOVER = 'FOCUS_POP_HOVER';

export function showPopOver(payload) {
  return {
    type: SHOW_POP_OVER
  }
}

export function hidePopOver() {
  return {
    type: HIDE_POP_OVER,
  }
}

export function focusOnPopHover() {
  return {
    type: FOCUS_POP_HOVER,
  }
}

export function blurOnPopHover() {
  return {
    type: BLUR_POP_HOVER,
  }
}

const initialState = {
  isFocusOnPopHover: false,
  isPopOverOpen: false
}

export default function popOver(state = initialState, action) {
  switch (action.type) {
    case SHOW_POP_OVER:
      return Object.assign({}, state, {
        isPopOverOpen: true
      })
    case HIDE_POP_OVER:
      return Object.assign({}, state, {
        isPopOverOpen: false,
      })
    case FOCUS_POP_HOVER:
      return Object.assign({}, state, {
        isFocusOnPopHover: true,
      })
    case BLUR_POP_HOVER:
      return Object.assign({}, state, {
        isFocusOnPopHover: false,
      })
    default: return state;
  }
}