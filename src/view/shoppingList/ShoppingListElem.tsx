import React, { useMemo } from 'react';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
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
	})
);

interface IData {
	priority: string;
	listName: string;
}

interface IShoppingListElem {
	data: IData;
}

const ShoppingListElem = ({ data, idx }: any) => {
	const classes = useStyles({ idx });

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
				{data.priority === 'HIGH' ? (
					<ArrowUpward color="error" className={classes.icon} />
				) : (
					<ArrowDownward color="action" className={classes.icon} />
				)}
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
