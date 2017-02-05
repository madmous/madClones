import * as organizationActions from './organization';
import reducer from './organization';

describe('organization actions', () => {
  it('should create updateOrganizations action', () => {
    const payload = {};
    const expectedAction = {
      type: 'UPDATE_ORGANIZATIONS',
      payload
    };

    expect(organizationActions.updateOrganizations(payload)).toEqual(expectedAction)
  })

  it('should create addOrganizationRequest action', () => {
    const expectedAction = {
      type: 'ADD_ORGANIZATION_REQUEST'
    };

    expect(organizationActions.addOrganizationRequest()).toEqual(expectedAction)
  })

  it('should create addOrganizationSuccess action', () => {
    const expectedAction = {
      type: 'ADD_ORGANIZATION_SUCCESS'
    };

    expect(organizationActions.addOrganizationSuccess()).toEqual(expectedAction)
  })

  it('should create addOrganizationFail action', () => {
    const payload = {};
    const expectedAction = {
      type: 'ADD_ORGANIZATION_FAIL',
      payload
    };

    expect(organizationActions.addOrganizationFail(payload)).toEqual(expectedAction)
  })

  it('should create openModal action', () => {
    const expectedAction = {
      type: 'OPEN_MODAL'
    };

    expect(organizationActions.openModal()).toEqual(expectedAction)
  })

  it('should create closeModal action', () => {
    const expectedAction = {
      type: 'CLOSE_MODAL'
    };

    expect(organizationActions.closeModal()).toEqual(expectedAction)
  })
})

describe('organization reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
        isFetchingOrganization: false,
        isFetchingOrganizationSuccessful: false,
        errorMessage: '',

        isModalOpen: false,

        organizations:[]
      }
    )
  })

  it('should handle UPDATE_ORGANIZATIONS', () => {
    const payload = {
      organizations: [{
        _id: "1",
        boards: [],
        displayName: "organizationDisplayName",
        name: "organizationName"
      }]
    };

    expect(
      reducer([], {
        type: 'UPDATE_ORGANIZATIONS',
        payload
      })
    ).toEqual({
        organizations: payload.organizations
      }
    )
  })

  it('should handle ADD_ORGANIZATION_SUCCESS', () => {
    expect(
      reducer([], {
        type: 'ADD_ORGANIZATION_SUCCESS'
      })
    ).toEqual({
        isFetchingOrganizationSuccessful: true,
        isFetchingOrganization: false
      }
    )
  })

  it('should handle ADD_ORGANIZATION_FAIL', () => {
    const payload = {
      error: 'Please enter an organization name'
    };

    expect(
      reducer([], {
        type: 'ADD_ORGANIZATION_FAIL',
        payload
      })
    ).toEqual({
        isFetchingOrganizationSuccessful: false,
        isFetchingOrganization: false,
        errorMessage: payload.error
      }
    )
  })

  it('should handle OPEN_MODAL', () => {
    expect(
      reducer([], {
        type: 'OPEN_MODAL'
      })
    ).toEqual({
        isModalOpen: true
      }
    )
  })

  it('should handle CLOSE_MODAL', () => {
    expect(
      reducer([], {
        type: 'CLOSE_MODAL'
      })
    ).toEqual({
        isModalOpen: false
      }
    )
  })
})