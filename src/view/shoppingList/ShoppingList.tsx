import React, { useEffect, useMemo } from 'react';
import Layout from 'core/components/Layout';
import { useDispatch, useSelector } from 'react-redux';
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
	})
);

const ShoppingList = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { listData } = useSelector(getShoppingList);

	useEffect(() => {
		dispatch(ShoppingListActions.getLists());
	}, [dispatch]);

	const getListItems = useMemo(() => {
		return listData.map((elem: any, idx: number) => (
			<ShoppingListElem key={elem._id} data={elem} idx={idx} />
		));
	}, [listData]);

	return (
		<Layout>
			<Container maxWidth="xs" disableGutters className={classes.root}>
				<List className={classes.list}>{getListItems}</List>
			</Container>
		</Layout>
	);
};

export default ShoppingList;
