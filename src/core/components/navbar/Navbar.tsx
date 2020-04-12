import React, { RefObject } from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	makeStyles,
	createStyles,
	Theme,
	Box,
} from '@material-ui/core';
import { Menu as MenuIcon, PersonOutline } from '@material-ui/icons';
import logo from 'images/Logo.png';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			backgroundColor: 'rgba(0,228,255,1)',
			boxShadow: 'unset',
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
		logo: {
			width: '100%',
			height: '30px',
			backgroundImage: `url(${logo})`,
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'contain',
			backgroundPosition: 'center',
		},
	})
);

interface INavbar {
	appBarRef: RefObject<HTMLDivElement>;
}

const Navbar = ({ appBarRef }: INavbar) => {
	const classes = useStyles();

	return (
		<AppBar className={classes.root} ref={appBarRef} position="sticky">
			<Toolbar>
				<IconButton
					edge="start"
					className={classes.menuButton}
					color="inherit"
				>
					<MenuIcon />
				</IconButton>
				<Box className={classes.logo}></Box>
				<IconButton edge="start" color="inherit">
					<PersonOutline />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
