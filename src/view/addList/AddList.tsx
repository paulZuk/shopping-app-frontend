import React, { useState, useCallback } from 'react';
import {
	Typography,
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
} from '@material-ui/core';
import AddListActions, { Priority } from './actions/AddListActions';
import useError from 'core/hooks/useError';
import Layout from 'core/components/Layout';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		header: {
			padding: theme.spacing(4),
		},
		textInput: {
			margin: theme.spacing(1),
		},
		form: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
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
	const [sharedInput, setSharedInput] = useState('');
	const [sharedChecked, setSharedChecked] = useState(false);
	const { showError } = useError();
	const dispatch = useDispatch();

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
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setSharedInput(event.target.value);
		},
		[setSharedInput]
	);

	const handleAddList = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			dispatch(
				AddListActions.addList({
					listName,
					priority,
					shared: sharedInput,
				})
			);
		},
		[dispatch, listName, priority, sharedInput]
	);

	console.log(priority);

	return (
		<Layout>
			<Container maxWidth="xs" className={classes.form}>
				<Typography
					className={classes.header}
					color="secondary"
					variant="h4"
					align="center"
				>
					Add list
				</Typography>
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
						<MenuItem value={Priority.Mid}>Mid</MenuItem>
						<MenuItem value={Priority.Low}>Low</MenuItem>
					</Select>
				</FormControl>
				{/* <TextField
					id="priority"
					label="Priority"
					variant="outlined"
					autoComplete="off"
					className={classes.textInput}
					value={priority}
					error={!!showError(priority)}
					onChange={handleChangePriority}
					helperText={showError(priority)}
					fullWidth
				/> */}
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
					<TextField
						id="sharedInput"
						label="User email or login"
						variant="outlined"
						autoComplete="off"
						className={classes.textInput}
						value={sharedInput}
						error={!!showError(sharedInput)}
						onChange={handleChangeSharedInput}
						helperText={showError(sharedInput)}
						fullWidth
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
