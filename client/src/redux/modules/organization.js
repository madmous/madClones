export const UPDATE_ORGANIZATIONS = 'UPDATE_ORGANIZATIONS'

export function updateOrganizations(payload) {
  return {
		type: UPDATE_ORGANIZATIONS,
		payload
	}
}

const initialState = {
  organizations: []
}

export default function organization(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ORGANIZATIONS:
    return Object.assign({}, state, {
      organizations: action.payload.organizations
    })
    default: return state;
  }
}