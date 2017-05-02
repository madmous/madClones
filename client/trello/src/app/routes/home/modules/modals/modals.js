const OPEN_CREATE_BOARD_MODAL = 'OPEN_CREATE_BOARD_MODAL';
const OPEN_CREATE_ORGANIZATION_MODAL = 'OPEN_CREATE_ORGANIZATION_MODAL';

const CLOSE_ALL_MODALS = 'CLOSE_ALL_MODALS';
const CLOSE_CREATE_BOARD_MODAL = 'CLOSE_CREATE_BOARD_MODAL';
const CLOSE_CREATE_ORGANIZATION_MODAL = 'CLOSE_CREATE_ORGANIZATION_MODAL';

const BLUR_MODAL = 'BLUR_MODAL';
const FOCUS_MODAL = 'FOCUS_MODAL';

export function closeAllModals() {
  return {
		type: CLOSE_ALL_MODALS
	};
}

export function openCreateBoardModal() {
  return {
		type: OPEN_CREATE_BOARD_MODAL
	};
}

export function openCreateOrganizationModal() {
  return {
		type: OPEN_CREATE_ORGANIZATION_MODAL
	};
}

export function closeCreateBoardModal() {
  return {
		type: CLOSE_CREATE_BOARD_MODAL
	};
}

export function closeCreteOrganizationModal() {
  return {
		type: CLOSE_CREATE_ORGANIZATION_MODAL
	};
}

export function focusOnModal() {
  return {
    type: FOCUS_MODAL,
  };
}

export function blurOnModal() {
  return {
    type: BLUR_MODAL,
  };
}

const initialState = {
	isCreateOrganizationModalOpen: false,
	isCreateBoardModalOpen: false,
	isFocusOnModal: false,
	isModalOpen: false
};

export default function modals(state = initialState, action) {
  switch (action.type) {
		case OPEN_CREATE_BOARD_MODAL:
			return Object.assign({}, state, {
				isCreateBoardModalOpen: true,
				isModalOpen: true
			});
		case OPEN_CREATE_ORGANIZATION_MODAL:
			return Object.assign({}, state, {
				isCreateOrganizationModalOpen: true,
				isModalOpen: true
			});
    case CLOSE_ALL_MODALS:
    	return Object.assign({}, state, {
				isCreateOrganizationModalOpen: false,
				isCreateBoardModalOpen: false,
				isModalOpen: false
    	});
		case CLOSE_CREATE_BOARD_MODAL:
			return Object.assign({}, state, {
				isCreateBoardModalOpen: false,
				isModalOpen: false
			});
		case CLOSE_CREATE_ORGANIZATION_MODAL:
			return Object.assign({}, state, {
				isCreateOrganizationModalOpen: false,
				isModalOpen: false
			});
		case FOCUS_MODAL:
			return Object.assign({}, state, {
				isFocusOnModal: true
			});
		case BLUR_MODAL:
			return Object.assign({}, state, {
				isFocusOnModal: false
			});
    default: return state;
  }
}