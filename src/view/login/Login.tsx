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
import LoginActions from './actions/LoginActions';
import Register from '../register/Register';

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
		form: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
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
	const [error, setError] = useState(false);
	const [view, setView] = useState('login');
	const dispatch = useDispatch();

	const handleChangeLogin = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setLogin(event.target.value);
		},
		[setLogin]
	);

	const handleLoginClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			if (!login || !pass) {
				setError(true);
				return;
			}
			dispatch(LoginActions.tryLogin(login, pass));
			setError(false);
		},
		[dispatch, login, pass]
	);

	const handleRegisterClick = useCallback(() => {
		setView('register');
	}, [setView]);

	const handleChangePass = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setPass(event.target.value);
		},
		[setPass]
	);

	const showError = useCallback(
		(fieldValue: string) => {
			return error && !fieldValue;
		},
		[error]
	);

	const getRequiredText = useCallback(
		(fieldValue: string) => {
			return showError(fieldValue) ? 'This field is required' : null;
		},
		[showError]
	);

	return (
		<Container maxWidth={false} className={classes.root}>
			<Box className={classes.logo} />
			{view === 'register' ? (
				<Register />
			) : (
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
							<Typography align="right">
								Forgot password?
							</Typography>
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
					>
						Register
					</Button>
				</Container>
			)}
		</Container>
	);
};

export default Login;
