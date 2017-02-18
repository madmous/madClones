import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CreateOrganization from './CreateOrganization';

import { modalActionCreators } from '../../../routes/home/modules/index';

function mapStateToProps(state) {
	const { isCreateOrganizationModalOpen } = state.modals;

	return {
		isCreateOrganizationModalOpen
	}
}

function mapDispatchToProps(dispatch) {
  return { 
    modalActions: bindActionCreators(modalActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrganization);

