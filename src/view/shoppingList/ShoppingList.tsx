import React from 'react';
import Layout from 'core/components/Layout';
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

	return (
		<Layout>
			<Container maxWidth="xs" disableGutters className={classes.root}>
				<List className={classes.list}></List>
			</Container>
		</Layout>
	);
};

export default ShoppingList;
