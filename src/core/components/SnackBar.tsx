import React from 'react';
import { useDispatch } from 'react-redux';
import { Snackbar as MaterialUISnackBar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

interface ISnackBar {
	open: boolean;
	setVisible: (open: boolean) => void;
	type?: 'success' | 'info' | 'warning' | 'error' | undefined;
	message: string;
}

const SnackBar = ({ open, setVisible, type, message }: ISnackBar) => {
	const dispatch = useDispatch();
	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		dispatch(setVisible(false));
	};
	return (
		<MaterialUISnackBar
			open={open}
			autoHideDuration={6000}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
		>
			<Alert
				onClose={handleClose}
				severity={type || 'success'}
				elevation={6}
				variant="filled"
			>
				{message}
			</Alert>
		</MaterialUISnackBar>
	);
};

export default SnackBar;
