import React, { useState, useCallback } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	makeStyles,
	createStyles,
	Theme,
	Container,
	TextField,
	Button,
	Box,
	Link as MaterialUILink,
	Typography,
} from '@material-ui/core';
import useError from 'core/hooks/useError';
import LoginActions from './actions/LoginActions';
import UserActions from '../actions/UserActions';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		form: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
		},
		textInput: {
			margin: theme.spacing(1),
		},
		loginButton: {
			padding: theme.spacing(2.5),
			marginBottom: theme.spacing(4),
			textTransform: 'none',
		},
		registerButton: {
			margin: theme.spacing(1),
			padding: `${theme.spacing(1.5)}px ${theme.spacing(5)}px`,
			borderRadius: theme.spacing(5),
			textTransform: 'none',
		},
		registerContainer: {
			width: '100%',
			marginBottom: theme.spacing(4),
		},
	})
);

const RouterLink = React.forwardRef<any, Omit<LinkProps, 'to'>>(
	(props, ref) => <Link ref={ref} to="/remind" {...props} />
);

const Login = () => {
	const classes = useStyles();
	const [login, setLogin] = useState('');
	const [pass, setPass] = useState('');
	const dispatch = useDispatch();

	const { showError, getRequiredText, setError } = useError();

	const handleChangeLogin = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setLogin(event.target.value);
		},
		[setLogin]
	);

	const trylogin = useCallback(() => {
		dispatch(LoginActions.tryLogin(login, pass));
		setError(false);
	}, [dispatch, login, pass, setError])

	const handleLoginClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			if (!login || !pass) {
				setError(true);
				return;
			}
			trylogin();
		},
		[login, pass, setError, trylogin]
	);

	const handleRegisterClick = useCallback(() => {
		dispatch(UserActions.setUserView('register'));
	}, [dispatch]);

	const handleChangePass = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setPass(event.target.value);
		},
		[setPass]
	);

	const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
		if (event.keyCode === 13) {
			trylogin();
		}
	}, [trylogin]);

	return (
		<Container maxWidth="xs" className={classes.form}>
			<TextField
				id="login"
				label="Login"
				variant="outlined"
				autoComplete="off"
				className={classes.textInput}
				value={login}
				onChange={handleChangeLogin}
				helperText={getRequiredText(login)}
				fullWidth
				error={showError(login)}
				required
			/>
			<TextField
				id="pass"
				label="Password"
				variant="outlined"
				type="password"
				autoComplete="off"
				className={classes.textInput}
				value={pass}
				error={showError(pass)}
				onChange={handleChangePass}
				helperText={getRequiredText(pass)}
				fullWidth
				required
			/>
			<Box className={classes.registerContainer}>
				<MaterialUILink component={RouterLink} underline="none">
					<Typography align="right">Forgot password?</Typography>
				</MaterialUILink>
			</Box>
			<Button
				className={classes.loginButton}
				size="large"
				fullWidth
				variant="contained"
				color="primary"
				onClick={handleLoginClick}
			>
				Login
			</Button>
			<Typography color="primary">Not have account?</Typography>
			<Button
				className={classes.registerButton}
				size="medium"
				variant="outlined"
				color="primary"
				onClick={handleRegisterClick}
				onKeyDown={handleKeyDown}
			>
				Register
			</Button>
		</Container>
	);
};

export default Login;
