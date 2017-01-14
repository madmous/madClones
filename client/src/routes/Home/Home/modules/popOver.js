const SHOW_POP_OVER = 'SHOW_POP_OVER'
const HIDE_POP_OVER = 'HIDE_POP_OVER'

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

const initialState = {
  displayPopOver: false
}

export default function popOver(state = initialState, action) {
  switch (action.type) {
    case SHOW_POP_OVER:
      return Object.assign({}, state, {
        displayPopOver: true,
      })
    case HIDE_POP_OVER:
      return Object.assign({}, state, {
        displayPopOver: false,
      })
    default: return state;
  }
}