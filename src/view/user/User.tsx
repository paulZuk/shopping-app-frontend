import React from 'react';
import { useSelector } from 'react-redux';
import { Box, makeStyles, createStyles, Theme } from '@material-ui/core';
import useWindowSize from 'core/hooks/useWindowSize';
import Register from './register/Register';
import Login from './login/Login';
import Loader from 'core/components/Loader';
import SnackBar from 'core/components/SnackBar';
import getUserData from './selectors/getUserData';
import UserActions from './actions/UserActions';
import logo from 'images/Logo.png';

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
	const { windowHeight } = useWindowSize();
	const {
		loading,
		view,
		createdSnackBarVisible,
		loginSnackBarVisible,
	} = useSelector(getUserData);

	return (
		<>
			<Loader loading={loading} />
			<SnackBar
				open={createdSnackBarVisible}
				setOpen={UserActions.toggleCreatedSnackBar}
				message="User succesfully created! Now you can login."
			/>
			<SnackBar
				open={loginSnackBarVisible}
				setOpen={UserActions.toggleLoginSnackBar}
				type="error"
				message="Login or password is incorrect!"
			/>
			<Box height={windowHeight} width="100%" className={classes.root}>
				<Box className={classes.logo} />
				{view === 'login' ? <Login /> : <Register />}
			</Box>
		</>
	);
};

export default User;
