import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useError from '../../../core/hooks/useError';
import {
	makeStyles,
	createStyles,
	Theme,
	Container,
	TextField,
	Button,
	Box,
	Typography,
} from '@material-ui/core';
import RegisterActions from './actions/RegisterActions';
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
		signUpButton: {
			padding: theme.spacing(2.5),
			marginTop: theme.spacing(4),
			marginBottom: theme.spacing(4),
			textTransform: 'none',
		},
		textInput: {
			margin: theme.spacing(1),
		},
		signInWrapper: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
	})
);

const Register = () => {
	const classes = useStyles();
	const [login, setLogin] = useState('');
	const [pass, setPass] = useState('');
	const [email, setEmail] = useState('');
	const dispatch = useDispatch();

	const { showError, setError } = useError();

	const handleChangeLogin = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setLogin(event.target.value);
		},
		[setLogin]
	);

	const handleChangePass = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setPass(event.target.value);
		},
		[setPass]
	);

	const handleChangeEmail = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setEmail(event.target.value);
		},
		[setEmail]
	);

	const tryRegister = useCallback(() => {
		dispatch(
			RegisterActions.registerUser({
				name: login,
				password: pass,
				email,
			})
		);
		setError(false);
	}, [login, pass, email, setError, dispatch]);

	const handleSignUpClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			if (!login || !pass || !email) {
				setError(true);
				return;
			}
			tryRegister();
		},
		[login, pass, email, setError, tryRegister]
	);

	const handleSignInClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			dispatch(UserActions.setUserView('login'));
		},
		[dispatch]
	);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			console.log(event.keyCode);
			if (event.keyCode === 13) {
				tryRegister();
			}
		},
		[tryRegister]
	);

	return (
		<>
			<Container maxWidth="xs" className={classes.form}>
				<TextField
					id="login"
					label="Login"
					variant="outlined"
					autoComplete="off"
					className={classes.textInput}
					value={login}
					onChange={handleChangeLogin}
					onKeyDown={handleKeyDown}
					helperText={showError(login)}
					fullWidth
					error={!!showError(login)}
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
					error={!!showError(pass)}
					onChange={handleChangePass}
					onKeyDown={handleKeyDown}
					helperText={showError(pass)}
					fullWidth
					required
				/>
				<TextField
					id="email"
					label="E-mail"
					variant="outlined"
					autoComplete="off"
					className={classes.textInput}
					value={email}
					error={!!showError(email, 'email')}
					onChange={handleChangeEmail}
					onKeyDown={handleKeyDown}
					helperText={showError(email, 'email')}
					fullWidth
					required
				/>
				<Button
					className={classes.signUpButton}
					size="large"
					fullWidth
					variant="contained"
					color="primary"
					onClick={handleSignUpClick}
				>
					Register
				</Button>
				<Box className={classes.signInWrapper}>
					<Typography color="primary">
						Already have an account?
					</Typography>
					<Button
						color="primary"
						variant="text"
						onClick={handleSignInClick}
					>
						Sign in
					</Button>
				</Box>
			</Container>
		</>
	);
};

export default Register;
