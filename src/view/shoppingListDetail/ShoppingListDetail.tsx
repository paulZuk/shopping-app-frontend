import React, { useMemo, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import {
	List,
	makeStyles,
	Theme,
	createStyles,
	TextField,
	CircularProgress,
	Container,
	Box,
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	Zoom,
	Fab,
	Collapse,
	Typography,
} from '@material-ui/core';
import { ExpandMore, Add } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { ListItem, Checkbox, FormControlLabel } from '@material-ui/core';
import Layout from 'core/components/Layout';
import getShoppingList from '../shoppingList/selectors/getShoppingList';
import getDetailList from './selectors/getDetailList';
import ShoppingListDetailActions from './actions/ShoppingListDetailActions';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			width: '100%',
			height: '100%',
			backgroundColor: 'rgb(0, 228, 255)',
		},
		list: {
			width: '100%',
			overflow: 'auto',
			height: '100%',
			borderTop: '1px solid rgba(25, 150, 252, 0.5)',
			paddingTop: 0,
		},
		autocompleteWrapper: {
			padding: `${theme.spacing(1)}px 0`,
			width: '100%',
			backgroundColor: 'rgba(0, 228, 255, 1)',
			display: 'flex',
			justifyContent: 'center',
		},
		autocomplete: {
			width: '95%',
		},
		listWrapper: {
			padding: '0',
			backgroundColor: 'rgba(0, 228, 255, 1)',
		},
		fabButton: {
			position: 'fixed',
			bottom: '5%',
			right: '5%',
			zIndex: 1,
		},
		checkboxLabel: {},
	})
);

const ShoppingListDetail = () => {
	const { listData } = useSelector(getShoppingList);
	const { detailData, types } = useSelector(getDetailList);
	const [open, setOpen] = useState(false);
	const [hideAutocomplete, setHideAutocomplete] = useState(true);
	const [product, setProduct] = useState<{ name: string | null }>({
		name: null,
	});
	const classes = useStyles(detailData);
	const params = useParams<{ id: 'string' }>();
	const dispatch = useDispatch();

	const selectedList = useMemo(
		() => listData.find((list: any) => list._id === params.id),
		[listData, params.id]
	);

	const handleChangeSharedInput = useCallback(
		(event: React.ChangeEvent<{}>, value: any, reason: string) => {
			console.log({ event, value, reason });
			setProduct(value);
		},
		[]
	);

	const throttledScroll = useCallback(
		_.throttle((e: any) => {
			setHideAutocomplete(true);
		}, 200),
		[]
	);

	const handleScroll = useCallback(
		e => {
			e.persist();
			throttledScroll(e);
		},
		[throttledScroll]
	);

	const handleAddClick = useCallback(() => {
		setHideAutocomplete(false);
	}, []);

	const handleCheckboxClick = (id: string) => (e: any, checked: boolean) =>
		dispatch(ShoppingListDetailActions.toggleDetailChecked(id));

	return (
		<Layout detailListName={selectedList?.listName} childView path="/list">
			<Container
				disableGutters
				maxWidth="xs"
				className={classes.container}
			>
				<Collapse unmountOnExit in={!hideAutocomplete}>
					<Box className={classes.autocompleteWrapper}>
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
							getOptionLabel={(option: any) => option.name || ''}
							options={detailData}
							onChange={handleChangeSharedInput}
							value={product}
							renderInput={params => (
								<TextField
									{...params}
									label="Select product"
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
					</Box>
				</Collapse>
				<List onScroll={handleScroll} dense className={classes.list}>
					{types.map(sectionId => (
						<li key={`section-${sectionId}`}>
							<ExpansionPanel defaultExpanded>
								<ExpansionPanelSummary
									expandIcon={<ExpandMore />}
									id="panel1a-header"
								>
									<Box>{sectionId}</Box>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<List dense>
										{detailData
											.filter(
												elem => elem.type === sectionId
											)
											.map(item => (
												<ListItem
													key={`item-${sectionId}-${item.name}`}
												>
													<FormControlLabel
														control={
															<Checkbox
																checked={
																	item.checked
																}
																onChange={handleCheckboxClick(
																	item.id
																)}
															/>
														}
														label={
															<Typography color="primary">
																{item.name}
															</Typography>
														}
													/>
												</ListItem>
											))}
									</List>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						</li>
					))}
				</List>
			</Container>
			<Zoom in={hideAutocomplete}>
				<Fab
					onClick={handleAddClick}
					className={classes.fabButton}
					color="primary"
				>
					<Add />
				</Fab>
			</Zoom>
		</Layout>
	);
};

export default ShoppingListDetail;
