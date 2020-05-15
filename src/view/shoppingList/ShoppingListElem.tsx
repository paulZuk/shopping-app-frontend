import React, { useMemo } from 'react';
import { AvatarGroup } from '@material-ui/lab';
import {
	ListItem,
	Typography,
	Box,
	LinearProgress,
	Avatar,
	makeStyles,
	Theme,
	createStyles,
} from '@material-ui/core';

interface IData {
	priority: string;
	listName: string;
}

interface IShoppingListElem {
	data: IData;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		listItem: {
			// borderBottom: '1px solid rgba(25, 150, 252, .5)',
			// borderTop: '1px solid rgba(25, 150, 252, .5)',
			marginBottom: theme.spacing(1),
			flexDirection: 'column',
			backgroundColor: 'rgb(100, 239, 255)',
		},
		wrapper: {
			width: '100%',
			padding: `${theme.spacing(1)}px 0`,
		},
		priorityWrapper: {
			width: '100%',
			padding: `${theme.spacing(0.5)}px 0`,
			display: 'flex',
			alignItems: 'center',
		},
		progress: {
			backgroundColor: 'white',
		},
		icon: {
			paddingLeft: theme.spacing(1),
		},
		avatar: {
			width: theme.spacing(4),
			height: theme.spacing(4),
			backgroundColor: theme.palette.primary.main,
		},
		avatarWrapper: {
			position: 'absolute',
			right: theme.spacing(2),
			top: theme.spacing(3),
		},
		statusDot: {
			width: '10px',
			height: '10px',
			borderRadius: '50%',
			backgroundColor: ({ data }: IShoppingListElem) =>
				data.priority === 'HIGH' ? '#ff5722' : '#4caf50',
			margin: `0 ${theme.spacing(1)}px`,
		},
	})
);

const ShoppingListElem = ({ data }: any) => {
	const classes = useStyles({ data });

	const getAvatars = useMemo(() => {
		return data?.shared.map((user: any) => (
			<Avatar
				key={user._id}
				alt={user.login}
				src="/static/images/avatar/2.jpg"
				className={classes.avatar}
			/>
		));
	}, [data, classes]);

	return (
		<ListItem className={classes.listItem}>
			<Box className={classes.wrapper}>
				<Typography display="block" variant="h6" color="secondary">
					{data.listName}
				</Typography>
			</Box>
			<Box className={classes.priorityWrapper}>
				<Typography display="block" color="secondary">
					Priority
				</Typography>
				<div className={classes.statusDot}></div>
			</Box>
			<Box className={classes.wrapper}>
				<LinearProgress
					className={classes.progress}
					color="primary"
					variant="determinate"
					value={Math.floor(Math.random() * (100 - 1) + 1)}
				/>
			</Box>
			<Box className={classes.avatarWrapper}>
				<AvatarGroup max={3}>{getAvatars}</AvatarGroup>
			</Box>
		</ListItem>
	);
};

export default ShoppingListElem;
