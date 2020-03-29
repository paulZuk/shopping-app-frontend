import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserActions from '../../actions/UserActions';
import { IRootState } from '../../../../reducer';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Typography,
} from '@material-ui/core';

const UserExist = () => {
	const dispatch = useDispatch();
	const userExist = useSelector((state: IRootState) =>
		state.user.get('userExist')
	);

	const handleClose = useCallback(() => {
		dispatch(UserActions.hideExistingUserMsg());
	}, [dispatch]);

	return (
		<Dialog open={userExist} onClose={handleClose}>
			<DialogTitle>
				<Typography color="primary">User already exist</Typography>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Email that you have entered is existing in our database.
					Please select diffrent and try again.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary" variant="text">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default UserExist;
