const OPEN_CREATE_BOARD_MODAL = 'OPEN_CREATE_BOARD_MODAL'
const OPEN_CREATE_ORGANIZATION_MODAL = 'OPEN_CREATE_ORGANIZATION_MODAL'

const CLOSE_ALL_MODALS = 'CLOSE_ALL_MODALS'
const CLOSE_CREATE_BOARD_MODAL = 'CLOSE_CREATE_BOARD_MODAL'
const CLOSE_CREATE_ORGANIZATION_MODAL = 'CLOSE_CREATE_ORGANIZATION_MODAL'

export function closeAllModals() {
  return {
		type: CLOSE_ALL_MODALS
	}
}

export function openCreateBoardModal() {
  return {
		type: OPEN_CREATE_BOARD_MODAL
	}
}

export function openCreateOrganizationModal() {
  return {
		type: OPEN_CREATE_ORGANIZATION_MODAL
	}
}

export function closeCreateBoardModal() {
  return {
		type: CLOSE_CREATE_BOARD_MODAL
	}
}

export function closeCreteOrganizationModal() {
  return {
		type: CLOSE_CREATE_ORGANIZATION_MODAL
	}
}

const initialState = {
	isCreateBoardModalOpen: false,
	isCreateOrganizationModalOpen: false
}

export default function modals(state = initialState, action) {
  switch (action.type) {
		case OPEN_CREATE_BOARD_MODAL:
			return Object.assign({}, state, {
				isCreateBoardModalOpen: true
			})
		case OPEN_CREATE_ORGANIZATION_MODAL:
			return Object.assign({}, state, {
				isCreateOrganizationModalOpen: true
			})
    case CLOSE_ALL_MODALS:
    	return Object.assign({}, state, {
				isCreateBoardModalOpen: false,
				isCreateOrganizationModalOpen: false
    	})
		case CLOSE_CREATE_BOARD_MODAL:
			return Object.assign({}, state, {
				isCreateBoardModalOpen: false
			})
		case CLOSE_CREATE_ORGANIZATION_MODAL:
			return Object.assign({}, state, {
				isCreateOrganizationModalOpen: false
			})
    default: return state;
  }
}