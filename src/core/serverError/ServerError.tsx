import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getErrorData from './selectors/getServerErrorData';
import ServerErrorActions from './actions/ServerErrorActions';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Typography,
} from '@material-ui/core';

const ServerError = () => {
	const { visible, errorData } = useSelector(getErrorData);
	const data = errorData.pop() || {};
	const dispatch = useDispatch();

	const handleClose = useCallback(() => {
		dispatch(ServerErrorActions.hideError());
	}, [dispatch]);

	return (
		<Dialog
			transitionDuration={{ enter: 200, exit: 0 }}
			open={visible}
			onClose={handleClose}
		>
			<DialogTitle>
				<Typography color="primary">Server error</Typography>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>{data.msg}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary" variant="text">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ServerError;
