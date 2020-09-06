import React, { useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
	List,
	makeStyles,
	Theme,
	createStyles,
	TextField,
	CircularProgress,
	Container,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Layout from 'core/components/Layout';
import getDetailListData from './selectors/getDetailListData';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		listContainer: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'flex-start',
			width: '100%',
			height: '100%',
		},
		list: {
			width: '100%',
		},
		autocomplete: {
			width: '100%',
		},
	})
);

const options = [{ name: 'mleko' }, { name: 'woda' }];

const ShoppingListDetail = () => {
	const { listData } = useSelector(getDetailListData);
	const [open, setOpen] = useState(false);
	const [ingredient, setIngredient] = useState<{ name: string | null }>({
		name: null,
	});
	const classes = useStyles();
	const params = useParams<{ id: 'string' }>();

	const selectedList = useMemo(
		() => listData.find((list: any) => list._id === params.id),
		[listData, params.id]
	);

	const handleChangeSharedInput = useCallback(
		(event: React.ChangeEvent<{}>, value: any) => {
			setIngredient(value);
		},
		[]
	);

	return (
		<Layout detailListName={selectedList?.listName} childView path="/list">
			<Container maxWidth="xs" className={classes.listContainer}>
				<Autocomplete
					open={open}
					className={classes.autocomplete}
					onOpen={() => {
						setOpen(true);
					}}
					onClose={() => {
						setOpen(false);
					}}
					getOptionSelected={(option: any, value: any) =>
						option.name === value.name
					}
					getOptionLabel={(option: any) => option.name}
					options={options}
					onChange={handleChangeSharedInput}
					value={ingredient}
					renderInput={params => (
						<TextField
							{...params}
							label="E-mail or login"
							variant="outlined"
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<React.Fragment>
										{false ? (
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
				<List dense className={classes.list}></List>
			</Container>
		</Layout>
	);
};

export default ShoppingListDetail;
