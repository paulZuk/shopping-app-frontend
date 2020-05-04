import React, { useEffect, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from 'core/components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import ShoppingListActions from './actions/ShoppingListActions';
import getShoppingList from './selectors/getShoppingList';
import ShoppingListElem from './ShoppingListElem';

import {
	Container,
	makeStyles,
	createStyles,
	Theme,
	List,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
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
		fabButton: {
			position: 'fixed',
			bottom: '10%',
			right: '5%',
			zIndex: 9999,
		},
	})
);

const ShoppingList = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const { listData } = useSelector(getShoppingList);

	useEffect(() => {
		dispatch(ShoppingListActions.getLists());
	}, [dispatch]);

	const getListItems = useMemo(() => {
		return listData.map((elem: any, idx: number) => (
			<ShoppingListElem key={elem._id} data={elem} idx={idx} />
		));
	}, [listData]);

	const handleAddClick = useCallback(() => {
		history.push('/add');
	}, [history]);

	return (
		<Layout>
			<Container maxWidth="xs" disableGutters className={classes.root}>
				<List className={classes.list}>{getListItems}</List>
			</Container>
			<Fab
				onClick={handleAddClick}
				className={classes.fabButton}
				color="primary"
			>
				<AddIcon />
			</Fab>
		</Layout>
	);
};

export default ShoppingList;
