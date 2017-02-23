const OPEN_BOARDS_MENU = 'OPEN_BOARDS_MENU';
const HIDE_BOARDS_MENU = 'HIDE_BOARDS_MENU';

const FOCUS_BOARDS_MENU = 'FOCUS_BOARDS_MENU';
const BLUR_BOARDS_MENU = 'BLUR_BOARDS_MENU';

export function openBoardsMenu() {
  return {
		type: OPEN_BOARDS_MENU
	};
}

export function hideBoardsMenu() {
  return {
		type: HIDE_BOARDS_MENU
	};
}

export function focusOnBoardsMenu() {
  return {
    type: FOCUS_BOARDS_MENU,
  }
}

export function blurOnBoardsMenu() {
  return {
    type: BLUR_BOARDS_MENU,
  }
}

const initialState = {
  isFocusOnBoardsMenu: false,
  isBoardsMenuOpen: false
}

export default function boardsMenu(state = initialState, action) {
  switch (action.type) {
    case OPEN_BOARDS_MENU:
			return Object.assign({}, state, {
				isBoardsMenuOpen: true
			});
    case HIDE_BOARDS_MENU:
			return Object.assign({}, state, {
				isBoardsMenuOpen: false
			});
    case FOCUS_BOARDS_MENU:
      return Object.assign({}, state, {
        isFocusOnBoardsMenu: true,
      })
    case BLUR_BOARDS_MENU:
      return Object.assign({}, state, {
        isFocusOnBoardsMenu: false,
      })
    default: return state;
  }
}