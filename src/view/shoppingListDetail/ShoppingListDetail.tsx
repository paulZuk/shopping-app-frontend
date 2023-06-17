import React, {
	useMemo,
	useState,
	useCallback,
	useEffect,
	useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import _ from "lodash";
import {
	List,
	makeStyles,
	Theme,
	createStyles,
	TextField,
	CircularProgress,
	Container,
	Box,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Zoom,
	Fab,
	Typography,
} from "@material-ui/core";
import {
	ExpandMore,
	Add,
	AddCircleOutlineOutlined,
	Remove,
} from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import { ListItem, Checkbox, FormControlLabel } from "@material-ui/core";
import Layout from "core/components/Layout";
import getShoppingList from "../shoppingList/selectors/getShoppingList";
import getDetailList from "./selectors/getDetailList";
import ShoppingListDetailActions from "./actions/ShoppingListDetailActions";
import ProductActions from "view/product/actions/ProductActions";
import getProductList from "view/product/selectors/getProductList";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			width: "100%",
			height: "100%",
			backgroundColor: "rgb(0, 228, 255)",
		},
		list: {
			width: "100%",
			overflow: "auto",
			height: "100%",
			borderTop: "1px solid rgba(25, 150, 252, 0.5)",
			paddingTop: "88px",
		},
		autocompleteWrapper: {
			padding: `${theme.spacing(2)}px 0`,
			width: "100%",
			backgroundColor: "rgba(0, 228, 255, 1)",
			display: hideAutocomplete => (hideAutocomplete ? "none" : "flex"),
			justifyContent: "space-around",
			alignItems: "center",
			position: "fixed",
			zIndex: 1,
		},
		autocomplete: {
			width: "80%",
		},
		listWrapper: {
			padding: "0",
			backgroundColor: "rgba(0, 228, 255, 1)",
		},
		fabButton: {
			position: "fixed",
			bottom: "5%",
			right: "5%",
			zIndex: 1,
		},
		addButton: {
			fontSize: "30px",
		},
		checkboxLabel: {},
		detailList: {
			width: "100%",
		},
		detailListItem: {
			justifyContent: "space-between",
			paddingLeft: 0,
			paddingRight: 0,
		},
		itemActionWrapper: {
			display: "flex",
			justifyContent: "flex-end",
		},
		counter: {
			margin: "0 10px",
		},
	})
);

const ShoppingListDetail = () => {
	const { listData } = useSelector(getShoppingList);
	const { detailData, types } = useSelector(getDetailList);
	const { productList, loading } = useSelector(getProductList);
	const [open, setOpen] = useState(false);
	const [hideAutocomplete, setHideAutocomplete] = useState(false);
	const [product, setProduct] = useState<{ name: string } | null>(null);
	const listEl = useRef<HTMLUListElement>(null);
	const classes = useStyles(hideAutocomplete);
	const params = useParams<{ id: "string" }>();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(ProductActions.getProduct());
	}, [dispatch]);

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

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const throttledScroll = useCallback(
		_.throttle((e: React.UIEvent<HTMLUListElement>) => {
			const target = e.target as HTMLUListElement;
			if (target.scrollTop < 50) {
				setHideAutocomplete(false);
				return;
			}
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
		if (listEl.current) {
			listEl.current.scrollTo(0, 0);
		}
		setHideAutocomplete(false);
	}, []);

	const handleAddToListClick = useCallback(() => {
		if (!product?.name) {
			return;
		}

		const data = { ...product, listId: params.id };

		dispatch(ShoppingListDetailActions.addToList(data));
	}, [params.id, product, dispatch]);

	const handleCheckboxClick = (id: string) => (e: any, checked: boolean) =>
		dispatch(ShoppingListDetailActions.toggleDetailChecked(id));

	const handleDeleteClick = (id: string) => (e: any) => {
		dispatch(ShoppingListDetailActions.removeFromList(id));
	};

	return (
		<Layout detailListName={selectedList?.listName} childView path="/list">
			<Container
				disableGutters
				maxWidth="xs"
				className={classes.container}
			>
				<Box className={classes.autocompleteWrapper}>
					<Autocomplete
						open={open}
						className={classes.autocomplete}
						onOpen={() => {
							setOpen(true);
						}}
						groupBy={(option: any) => option.type}
						onClose={() => {
							setOpen(false);
						}}
						getOptionSelected={(option: any, value: any) =>
							option.name === value.name
						}
						getOptionLabel={(option: any) => option.name || ""}
						options={productList.sort((a, b) =>
							a.type.localeCompare(b.type)
						)}
						loading={loading}
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
					<AddCircleOutlineOutlined
						className={classes.addButton}
						color="secondary"
						onClick={handleAddToListClick}
					/>
				</Box>
				<List
					ref={listEl}
					onScroll={handleScroll}
					dense
					className={classes.list}
				>
					{types.map(sectionId => (
						<li key={`section-${sectionId}`}>
							<Accordion defaultExpanded>
								<AccordionSummary
									expandIcon={<ExpandMore />}
									id="panel1a-header"
								>
									<Box>{sectionId}</Box>
								</AccordionSummary>
								<AccordionDetails>
									<List dense className={classes.detailList}>
										{detailData
											.filter(
												elem => elem.type === sectionId
											)
											.map(item => (
												<ListItem
													key={`item-${sectionId}-${item.name}`}
													className={
														classes.detailListItem
													}
												>
													<FormControlLabel
														control={
															<Checkbox
																checked={
																	item.checked
																}
																onChange={handleCheckboxClick(
																	item._id
																)}
															/>
														}
														label={
															<Typography color="secondary">
																{item.name}
															</Typography>
														}
													/>
													<Box
														className={
															classes.itemActionWrapper
														}
													>
														<Typography
															className={
																classes.counter
															}
															color="secondary"
														>
															{item.count}
														</Typography>
														<Remove
															color="secondary"
															onClick={handleDeleteClick(
																item._id
															)}
														/>
													</Box>
												</ListItem>
											))}
									</List>
								</AccordionDetails>
							</Accordion>
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
