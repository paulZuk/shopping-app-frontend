import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	TextField,
	makeStyles,
	createStyles,
	Theme,
	Container,
	Switch,
	FormGroup,
	FormControlLabel,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	CircularProgress,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import AddListActions, { Priority } from './actions/AddListActions';
import useError from 'core/hooks/useError';
import Layout from 'core/components/Layout';
import UserActions from 'view/user/actions/UserActions';
import getUsers from 'view/user/selectors/getUsers';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		textInput: {
			margin: theme.spacing(1),
		},
		sharedInput: {
			width: '100%',
			margin: theme.spacing(1),
		},
		form: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			width: '100%',
			height: '100%',
			paddingTop: theme.spacing(5),
		},
		sharedSwitchContainer: {
			width: '100%',
			color: 'white',
			marginLeft: theme.spacing(3),
		},
		addListButton: {
			padding: theme.spacing(2.5),
			marginBottom: theme.spacing(4),
			marginTop: theme.spacing(2),
			textTransform: 'none',
		},
	})
);

const AddList = () => {
	const classes = useStyles();
	const [listName, setListName] = useState('');
	const [priority, setPriority] = useState(Priority.Low);
	const [sharedInput, setSharedInput] = useState([]);
	const [sharedChecked, setSharedChecked] = useState(false);
	const [open, setVisible] = useState(false);
	const { showError, setError } = useError();
	const dispatch = useDispatch();
	const { loading, users: options } = useSelector(getUsers);

	useEffect(() => {
		dispatch(UserActions.getUsers());
	}, [dispatch]);

	const handleChangeListName = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setListName(event.target.value);
		},
		[setListName]
	);

	const handleChangePriority = useCallback(
		(event: React.ChangeEvent<{ value: unknown }>) => {
			setPriority(event.target.value as Priority);
		},
		[setPriority]
	);

	const handleChangeShared = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setSharedChecked(event.target.checked);
		},
		[setSharedChecked]
	);

	const handleChangeSharedInput = useCallback(
		(event: React.ChangeEvent<{}>, value: never[]) => {
			setSharedInput(value);
		},
		[setSharedInput]
	);

	const handleAddList = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			if (!listName) {
				setError(true);
				return;
			}

			dispatch(
				AddListActions.addList({
					listName,
					priority,
					shared: sharedInput,
				})
			);
		},
		[dispatch, listName, priority, sharedInput, setError]
	);

	return (
		<Layout path="/list" childView>
			<Container maxWidth="xs" className={classes.form}>
				<TextField
					id="listName"
					label="List name"
					variant="outlined"
					autoComplete="off"
					className={classes.textInput}
					value={listName}
					onChange={handleChangeListName}
					helperText={showError(listName)}
					fullWidth
					error={!!showError(listName)}
				/>
				<FormControl
					className={classes.textInput}
					fullWidth
					variant="outlined"
				>
					<InputLabel id="priorityInputLabel">Priority</InputLabel>
					<Select
						id="priorityInput"
						label="Priority"
						labelId="priorityInputLabel"
						value={priority}
						onChange={handleChangePriority}
					>
						<MenuItem value={Priority.High}>High</MenuItem>
						<MenuItem value={Priority.Low}>Low</MenuItem>
					</Select>
				</FormControl>
				<FormGroup className={classes.sharedSwitchContainer}>
					<FormControlLabel
						control={
							<Switch
								checked={sharedChecked}
								onChange={handleChangeShared}
								name="shared"
								color="primary"
							/>
						}
						label="Shared List?"
					/>
				</FormGroup>
				{sharedChecked && (
					<Autocomplete
						className={classes.sharedInput}
						open={open}
						onOpen={() => {
							setVisible(true);
						}}
						onClose={() => {
							setVisible(false);
						}}
						getOptionSelected={(option: any, value: any) =>
							option.name === value.name
						}
						getOptionLabel={(option: any) => option.name}
						options={options.toArray()}
						disabled={loading}
						loading={loading}
						onChange={handleChangeSharedInput}
						value={sharedInput}
						multiple
						renderInput={params => (
							<TextField
								{...params}
								label="E-mail or login"
								variant="outlined"
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<React.Fragment>
											{loading ? (
												<CircularProgress
													color="inherit"
													size={20}
												/>
											) : null}
											{params.InputProps.endAdornment}
										</React.Fragment>
									),
								}}
							/>
						)}
					/>
				)}
				<Button
					className={classes.addListButton}
					size="large"
					fullWidth
					variant="contained"
					color="primary"
					onClick={handleAddList}
				>
					Add list
				</Button>
			</Container>
		</Layout>
	);
};

export default AddList;
