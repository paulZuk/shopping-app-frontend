import React from 'react';
import {
	Toolbar,
	IconButton,
	makeStyles,
	Theme,
	createStyles,
	Box,
} from '@material-ui/core';
import { Menu as MenuIcon, PersonOutline } from '@material-ui/icons';
import logo from 'images/Logo.png';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		menuButton: {
			marginRight: theme.spacing(2),
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

const MainNavbar = () => {
	const classes = useStyles();
	return (
		<Toolbar>
			<IconButton
				edge="start"
				className={classes.menuButton}
				color="inherit"
			>
				<MenuIcon />
			</IconButton>
			<Box className={classes.logo} />
			<IconButton edge="start" color="inherit">
				<PersonOutline />
			</IconButton>
		</Toolbar>
	);
};

export default MainNavbar;
