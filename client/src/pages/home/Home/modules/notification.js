const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION'
const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'

export function updateNotification(payload) {
  return {
    type: UPDATE_NOTIFICATION,
    payload
  }
}

export function hideNotification() {
  return {
    type: HIDE_NOTIFICATION,
  }
}

const initialState = {
  errorMessages: []
}

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NOTIFICATION:
      return Object.assign({}, state, {
        errorMessages: action.payload,
      })
    case HIDE_NOTIFICATION:
      return Object.assign({}, state, {
        errorMessages: [],
      })
    default: return state;
  }
}