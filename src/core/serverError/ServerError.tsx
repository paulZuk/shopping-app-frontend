import React from 'react';
import { useSelector } from 'react-redux';
import getErrorData from './selectors/getServerErrorData';
import ServerErrorActions from './actions/ServerErrorActions';
import SnackBar from 'core/components/SnackBar';

const ServerError = () => {
	const { visible, errorData } = useSelector(getErrorData);

	// MYTODO: to remove after check
	console.log(errorData);
	//const data = errorData[0] || {};

	return (
		<SnackBar
			open={visible}
			setVisible={ServerErrorActions.toggleError}
			type="error"
			message={'test'}
		/>
	);
};

export default ServerError;
