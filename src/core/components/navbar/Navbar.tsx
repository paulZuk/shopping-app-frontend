import { RefObject } from 'react';
import { AppBar, makeStyles, createStyles, Theme } from '@material-ui/core';
import ChildNavbar from './components/ChildNavbar';
import MainNavbar from './components/MainNavbar';

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

export type NavbarProps = {
	appBarRef: RefObject<HTMLDivElement>;
	childView: boolean | undefined;
	path?: string;
	detailListName?: string;
}

const Navbar = ({ appBarRef, childView, path, detailListName }: NavbarProps) => {
	const classes = useStyles();

	return (
		<AppBar className={classes.root} ref={appBarRef} position="sticky">
			{childView ? (
				<ChildNavbar detailListName={detailListName} path={path} />
			) : (
				<MainNavbar />
			)}
		</AppBar>
	);
};

export default Navbar;
