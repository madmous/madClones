import * as modalsActions from './modals';
import reducer from './modals';

describe('modals actions', () => {
  it('should create close all modals action', () => {
    const expectedAction = {
      type: 'CLOSE_ALL_MODALS'
    };

    expect(modalsActions.closeAllModals()).toEqual(expectedAction)
  })

  it('should create openCreateBoardModal action', () => {
    const expectedAction = {
      type: 'OPEN_CREATE_BOARD_MODAL'
    };

    expect(modalsActions.openCreateBoardModal()).toEqual(expectedAction)
  })

  it('should create openCreateOrganizationModal action', () => {
    const expectedAction = {
      type: 'OPEN_CREATE_ORGANIZATION_MODAL'
    };

    expect(modalsActions.openCreateOrganizationModal()).toEqual(expectedAction)
  })

  it('should create closeCreateBoardModal action', () => {
    const expectedAction = {
      type: 'CLOSE_CREATE_BOARD_MODAL'
    };

    expect(modalsActions.closeCreateBoardModal()).toEqual(expectedAction)
  })

  it('should create closeCreteOrganizationModal action', () => {
    const expectedAction = {
      type: 'CLOSE_CREATE_ORGANIZATION_MODAL'
    };

    expect(modalsActions.closeCreteOrganizationModal()).toEqual(expectedAction)
  })

  it('should create focusOnModal action', () => {
    const expectedAction = {
      type: 'FOCUS_MODAL'
    };

    expect(modalsActions.focusOnModal()).toEqual(expectedAction)
  })

  it('should create blurOnModal action', () => {
    const expectedAction = {
      type: 'BLUR_MODAL'
    };

    expect(modalsActions.blurOnModal()).toEqual(expectedAction)
  })
})

describe('modals reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
        isCreateOrganizationModalOpen: false,
        isCreateBoardModalOpen: false,
        isFocusOnModal: false,
        isModalOpen: false
      }
    )
  })

  it('should handle OPEN_CREATE_BOARD_MODAL', () => {
    expect(
      reducer([], {
        type: 'OPEN_CREATE_BOARD_MODAL'
      })
    ).toEqual({
        isCreateBoardModalOpen: true,
				isModalOpen: true
      }
    )
  })

  it('should handle OPEN_CREATE_ORGANIZATION_MODAL', () => {
    expect(
      reducer([], {
        type: 'OPEN_CREATE_ORGANIZATION_MODAL'
      })
    ).toEqual({
        isCreateOrganizationModalOpen: true,
				isModalOpen: true
      }
    )
  })

  it('should handle CLOSE_ALL_MODALS', () => {
    expect(
      reducer([], {
        type: 'CLOSE_ALL_MODALS'
      })
    ).toEqual({
        isCreateOrganizationModalOpen: false,
				isCreateBoardModalOpen: false,
				isModalOpen: false
      }
    )
  })

  it('should handle CLOSE_CREATE_BOARD_MODAL', () => {
    expect(
      reducer([], {
        type: 'CLOSE_CREATE_BOARD_MODAL'
      })
    ).toEqual({
        isCreateBoardModalOpen: false,
				isModalOpen: false
      }
    )
  })

  it('should handle CLOSE_CREATE_ORGANIZATION_MODAL', () => {
    expect(
      reducer([], {
        type: 'CLOSE_CREATE_ORGANIZATION_MODAL'
      })
    ).toEqual({
        isCreateOrganizationModalOpen: false,
				isModalOpen: false
      }
    )
  })

  it('should handle FOCUS_MODAL', () => {
    expect(
      reducer([], {
        type: 'FOCUS_MODAL'
      })
    ).toEqual({
        isFocusOnModal: true
      }
    )
  })

  it('should handle BLUR_MODAL', () => {
    expect(
      reducer([], {
        type: 'BLUR_MODAL'
      })
    ).toEqual({
        isFocusOnModal: false
      }
    )
  })
})