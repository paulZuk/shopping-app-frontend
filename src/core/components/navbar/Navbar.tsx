import React, { RefObject } from 'react';
import { AppBar, makeStyles, createStyles, Theme } from '@material-ui/core';
import ChildNavbar from './ChildNavbar';
import MainNavbar from './MainNavbar';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			backgroundColor: 'rgba(0,228,255,1)',
			boxShadow: 'unset',
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

interface INavbar {
	appBarRef: RefObject<HTMLDivElement>;
	childView: boolean | undefined;
	path?: string;
}

const Navbar = ({ appBarRef, childView, path }: INavbar) => {
	const classes = useStyles();

	return (
		<AppBar className={classes.root} ref={appBarRef} position="sticky">
			{childView ? <ChildNavbar path={path} /> : <MainNavbar />}
		</AppBar>
	);
};

export default Navbar;
