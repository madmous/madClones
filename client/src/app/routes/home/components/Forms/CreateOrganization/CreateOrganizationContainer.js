import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CreateOrganization from './CreateOrganization';

import * as ModalActionCreators from '../../../modules/index';

function mapStateToProps(state) {
	const { isCreateOrganizationModalOpen } = state.modals;

	return {
		isCreateOrganizationModalOpen
	}
}

function mapDispatchToProps(dispatch) {
  return { 
    modalActions: bindActionCreators(ModalActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrganization);

