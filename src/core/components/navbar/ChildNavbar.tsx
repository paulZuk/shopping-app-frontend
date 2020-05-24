import React, { useMemo, useCallback } from 'react';
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import {
	Toolbar,
	IconButton,
	makeStyles,
	Theme,
	createStyles,
	Typography,
} from '@material-ui/core';
import { NavigateBefore } from '@material-ui/icons';
import { routes } from 'core/RouterProvider';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			backgroundColor: 'rgba(0,228,255,1)',
			boxShadow: 'unset',
		},
		icon: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
		childTitle: {
			width: '100%',
			marginRight: theme.spacing(6),
		},
	})
);

interface IChildNavbar {
	path?: string;
}

const ChildNavbar = ({ path }: IChildNavbar) => {
	const classes = useStyles();
	const location = useLocation();
	const history = useHistory();

	const isEditForm = useRouteMatch('/add/:id');

	const currentScreen = routes.indexOf(location.pathname);

	const getViewName = useMemo(() => {
		if (isEditForm) {
			return 'Edit list';
		}
		return 'Add list';
	}, [isEditForm]);

	const handleGoBack = useCallback(() => {
		history.push({
			pathname: path,
			state: { from: currentScreen },
		});
	}, [history, currentScreen, path]);

	return (
		<Toolbar>
			<IconButton
				onClick={handleGoBack}
				edge="start"
				className={classes.icon}
				color="inherit"
			>
				<NavigateBefore />
			</IconButton>
			<Typography
				className={classes.childTitle}
				variant="h5"
				align="center"
			>
				{getViewName}
			</Typography>
		</Toolbar>
	);
};

export default ChildNavbar;
