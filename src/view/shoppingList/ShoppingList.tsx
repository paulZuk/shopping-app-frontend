import React, {
	useEffect,
	useMemo,
	useCallback,
	useRef,
	useState,
} from 'react';
import _ from 'lodash';
import { useHistory, useLocation } from 'react-router-dom';
import Layout from 'core/components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ShoppingListActions from './actions/ShoppingListActions';
import getShoppingList from './selectors/getShoppingList';
import ShoppingListElem from './ShoppingListElem';
import Zoom from '@material-ui/core/Zoom';
import Loader from 'core/components/Loader';
import { routes } from 'core/RouterProvider';
import DeleteConfirmation from './components/DeleteConfirmation';

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
interface IHandleScroll {
	target: HTMLElement;
}

type SwipeDirection = 'Left' | 'Right' | null;
export interface ISwipeState {
	id: number | string | null;
	dir: SwipeDirection;
}

export const emptySwipeState = Object.freeze({
	id: null,
	dir: null,
});

const ShoppingList = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const [addButtonVisible, setAddButtonVisible] = useState(true);
	const [dialogVisible, setDialogVisible] = useState(false);
	const [swiped, setSwiped] = useState<ISwipeState>(emptySwipeState);
	let scrollPosition = useRef(0);
	const { listData, loading } = useSelector(getShoppingList);
	const [dataLoaded, setDataLoaded] = useState(false);

	const currentScreen = routes.indexOf(location.pathname);

	useEffect(() => {
		dispatch(ShoppingListActions.getLists());
	}, [dispatch]);

	useEffect(() => {
		if (!!listData.length) {
			setDataLoaded(true);
		}
	}, [listData.length]);

	const getListItems = useMemo(() => {
		return listData.map((elem: any, idx: number) => (
			<CSSTransition key={elem._id} timeout={300} classNames="flick">
				<ShoppingListElem
					data={elem}
					swiped={swiped}
					setSwiped={setSwiped}
					setDialogVisible={setDialogVisible}
					idx={idx}
				/>
			</CSSTransition>
		));
	}, [listData, swiped]);

	const handleAddClick = useCallback(() => {
		history.push({
			pathname: '/add',
			state: { from: currentScreen },
		});
	}, [history, currentScreen]);

	const throttledScroll = useCallback(
		_.throttle((e: IHandleScroll) => {
			const element = e.target;

			if (
				scrollPosition.current < element.scrollTop &&
				element.scrollTop > 50
			) {
				setAddButtonVisible(false);
			} else {
				setAddButtonVisible(true);
			}

			scrollPosition.current = element.scrollTop;
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

	const handleConfirmDelete = useCallback(() => {
		dispatch(ShoppingListActions.deleteList());
		setDialogVisible(false);
	}, [dispatch]);

	return (
		<Layout onScroll={handleScroll}>
			<DeleteConfirmation
				dialogVisible={dialogVisible}
				setDialogVisible={setDialogVisible}
				handleConfirm={handleConfirmDelete}
			/>
			<Container maxWidth="xs" disableGutters className={classes.root}>
				<Loader invisible loading={loading} />
				<List dense className={classes.list}>
					<TransitionGroup
						enter={dataLoaded}
						className="shopping-list"
						component={null}
					>
						{getListItems}
					</TransitionGroup>
				</List>
			</Container>
			<Zoom in={addButtonVisible}>
				<Fab
					onClick={handleAddClick}
					className={classes.fabButton}
					color="primary"
				>
					<AddIcon />
				</Fab>
			</Zoom>
		</Layout>
	);
};

export default ShoppingList;
