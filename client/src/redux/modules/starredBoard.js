export const UPDATE_STARRED_BOARDS = 'UPDATE_STARRED_BOARDS'

export function updateStarredBoards(payload) {
  return {
		type: UPDATE_STARRED_BOARDS,
		payload
	}
}

const initialState = {
  starredBoards: []
}

export default function starredBoard(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STARRED_BOARDS:
    return Object.assign({}, state, {
      starredBoards: action.payload.starredBoards
    })
    default: return state;
  }
}