import React from 'react';
import { useDispatch } from 'react-redux';
import {
	Snackbar as MaterialUISnackBar,
	createStyles,
	Theme,
	makeStyles,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: 'absolute',
			display: 'block',
			left: '50%',
			right: 'unset',
			width: '80%',
			transform: 'translateX(-50%)',
		},
	})
);

interface ISnackBar {
	open: boolean;
	setVisible: (open: boolean) => void;
	type?: 'success' | 'info' | 'warning' | 'error' | undefined;
	message: string;
}

const SnackBar = ({ open, setVisible, type, message }: ISnackBar) => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		dispatch(setVisible(false));
	};
	return (
		<MaterialUISnackBar
			open={open}
			autoHideDuration={4000}
			onClose={handleClose}
			className={classes.root}
			anchorOrigin={{
				vertical: 'bottom',
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
