import React from 'react';
import { useSelector } from 'react-redux';
import {
	Container,
	Box,
	makeStyles,
	createStyles,
	Theme,
} from '@material-ui/core';
import Register from './register/Register';
import Login from './login/Login';
import { IRootState } from '../../reducer';
import logo from '../../images/Logo.png';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			height: '100vh',
			width: '100%',
			background:
				'linear-gradient(180deg, rgba(0,228,255,1) 0%, rgba(255,255,255,1) 100%)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'column',
		},
		logo: {
			width: '100%',
			height: '100px',
			backgroundImage: `url(${logo})`,
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'contain',
			backgroundPosition: 'center',
			marginBottom: theme.spacing(5),
			[theme.breakpoints.down('xs')]: {
				width: '80%',
			},
		},
	})
);

const User = () => {
	const classes = useStyles();
	const activeView = useSelector((state: IRootState) =>
		state.user.get('view')
	);
	return (
		<Container maxWidth={false} className={classes.root}>
			<Box className={classes.logo} />
			{activeView === 'login' ? <Login /> : <Register />}
		</Container>
	);
};

export default User;
