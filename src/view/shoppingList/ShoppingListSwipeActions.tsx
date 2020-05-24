import React, { useCallback } from 'react';
import ShoppingListActions from './actions/ShoppingListActions';
import {
	makeStyles,
	createStyles,
	Theme,
	Typography,
	Box,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const swipeContainer = {
	width: '50%',
	height: '100%',
	display: 'flex',
	alignItems: 'center',
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		swipeContainer: {
			position: 'absolute',
			backgroundColor: 'gray',
			width: '100%',
			height: '100%',
			display: 'flex',
			top: '50%',
			transform: 'translateY(-50%)',
			justifyContent: 'space-between',
			alignItems: 'center',
			color: 'white',
		},
		swipeRightContainer: {
			...swipeContainer,
			justifyContent: 'flex-end',
			backgroundColor: '#ff5722',
		},
		swipeLeftContainer: {
			...swipeContainer,
			backgroundColor: 'rgb(25,150,252)',
		},
		deleteButton: {
			padding: `0 ${theme.spacing(2.5)}px`,
		},
		editButton: {
			padding: `0 ${theme.spacing(4)}px`,
		},
	})
);

interface SwipedButtons {
	id: string;
	setDialogVisible: (id: boolean) => void;
}

const SwipedButtons = ({ id, setDialogVisible }: SwipedButtons) => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();

	const handleDeleteClick = useCallback(() => {
		setDialogVisible(true);
		dispatch(ShoppingListActions.setDeleteId(id));
	}, [setDialogVisible, dispatch, id]);

	const handleEditClick = useCallback(() => {
		history.push(`/add/${id}`);
	}, [id, history]);

	return (
		<Box className={classes.swipeContainer}>
			<Box className={classes.swipeLeftContainer}>
				<Box onClick={handleEditClick} className={classes.editButton}>
					<Typography variant="h6">Edit</Typography>
				</Box>
			</Box>
			<Box className={classes.swipeRightContainer}>
				<Box
					onClick={handleDeleteClick}
					className={classes.deleteButton}
				>
					<Typography variant="h6">Delete</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default SwipedButtons;
