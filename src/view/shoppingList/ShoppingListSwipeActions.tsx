import React from 'react';
import {
	makeStyles,
	createStyles,
	Theme,
	Typography,
	Box,
} from '@material-ui/core';

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

const SwipedButtons = () => {
	const classes = useStyles();
	return (
		<Box className={classes.swipeContainer}>
			<Box className={classes.swipeLeftContainer}>
				<Box className={classes.editButton}>
					<Typography variant="h6">Edit</Typography>
				</Box>
			</Box>
			<Box className={classes.swipeRightContainer}>
				<Box className={classes.deleteButton}>
					<Typography variant="h6">Delete</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default SwipedButtons;
