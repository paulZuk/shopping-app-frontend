import React from 'react';
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
			border: '1px solid rgba(25, 150, 252, .5)',
			borderLeft: '0',
			borderRight: '0',
			flexDirection: 'column',
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
			color: 'red',
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

const ShoppingListElem = ({ data }: IShoppingListElem) => {
	const classes = useStyles();

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
					<ArrowUpward className={classes.icon} />
				) : (
					<ArrowDownward className={classes.icon} />
				)}
			</Box>
			<Box className={classes.wrapper}>
				<LinearProgress
					className={classes.progress}
					color="primary"
					variant="determinate"
					value={60}
				/>
			</Box>
			<Box className={classes.avatarWrapper}>
				<AvatarGroup max={3}>
					<Avatar
						alt="Remy Sharp"
						src="/static/images/avatar/1.jpg"
						className={classes.avatar}
					/>
					<Avatar
						alt="Travis Howard"
						src="/static/images/avatar/2.jpg"
						className={classes.avatar}
					/>
					<Avatar
						alt="Cindy Baker"
						src="/static/images/avatar/3.jpg"
						className={classes.avatar}
					/>
				</AvatarGroup>
			</Box>
		</ListItem>
	);
};

export default ShoppingListElem;
