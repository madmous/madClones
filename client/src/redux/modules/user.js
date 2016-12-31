export const UPDATE_USER = 'UPDATE_USER'

export function updateUser(payload) {
  return {
    type: UPDATE_USER,
    payload
  }
}

const initialState = {
  userId: '',
  fullName: ''
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return Object.assign({}, state, {
        userId: action.payload.user._id,
        fullName: action.payload.user.fullname,
      })
    default: return state;
  }
}