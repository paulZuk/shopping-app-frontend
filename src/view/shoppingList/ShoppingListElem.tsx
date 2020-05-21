import React, { useMemo, useCallback } from 'react';
import { AvatarGroup } from '@material-ui/lab';
import { useSwipeable } from 'react-swipeable';
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
import SwipedButtons from './ShoppingListSwipeActions';
import { emptySwipeState, ISwipeState } from './ShoppingList';

interface IData {
	_id: 'string';
	priority: string;
	listName: string;
	shared: Array<any>;
}

interface IShoppingListElem {
	data: IData;
	swiped: ISwipeState;
	setSwiped: (siwped: ISwipeState) => void;
	idx: number;
}

const getTranslateValue = (props: IShoppingListElem, range: number) => {
	const { data, swiped } = props;

	if (swiped.dir === null || data._id !== swiped.id) {
		return 0;
	}
	return {
		Left: -range,
		Right: range,
	}[swiped.dir];
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		mainWrapper: {
			position: 'relative',
			width: '100%',
			overflow: 'hidden',
			marginBottom: '5px',
			display: 'flex',
			alignItems: 'center',
		},
		listItem: {
			flexDirection: 'column',
			backgroundColor: 'rgb(100, 239, 255)',
			position: 'relative',
		},
		wrapper: {
			width: '100%',
			padding: `${theme.spacing(1)}px 0`,
		},
		itemWrapper: {
			position: 'relative',
			width: '100%',
			transform: props =>
				`translateX(${getTranslateValue(props, 100)}px)`,
			transition: '0.2s',
			backgroundColor: 'rgb(100, 239, 255)',
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

const ShoppingListElem = (props: IShoppingListElem) => {
	const { data, swiped, setSwiped } = props;
	const classes = useStyles(props);

	const handleSwipe = useCallback(
		e => {
			if (swiped.dir && swiped.id === data._id) {
				setSwiped(emptySwipeState);
				return;
			}
			setSwiped({ id: data._id, dir: e.dir });
		},
		[data._id, swiped, setSwiped]
	);

	const swipeHandlers = useSwipeable({
		onSwipedLeft: handleSwipe,
		onSwipedRight: handleSwipe,
		preventDefaultTouchmoveEvent: true,
	});

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
		<Box className={classes.mainWrapper}>
			<SwipedButtons id={data._id} />
			<Box className={classes.itemWrapper} {...swipeHandlers}>
				<ListItem className={classes.listItem}>
					<Box className={classes.wrapper}>
						<Typography
							display="block"
							variant="h6"
							color="secondary"
						>
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
			</Box>
		</Box>
	);
};

export default ShoppingListElem;
