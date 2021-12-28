import React, { PropsWithChildren } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
	Switch,
	Route,
	Redirect,
	useLocation,
	matchPath,
} from 'react-router-dom';
import User from 'view/user/User';
import AddList from 'view/addList/AddList';
import ShoppingList from 'view/shoppingList/ShoppingList';
import '../animations/animations.css';
import ShoppingListDetail from 'view/shoppingListDetail/ShoppingListDetail';

export const routes = [
	'/',
	'/login',
	'/list',
	'/list/:id',
	'/add',
	'/list-detail/:id',
];

const RouterProvider = ({ children }: PropsWithChildren<unknown>) => {
	const location = useLocation();
	const currentScreen = routes.findIndex(route =>
		matchPath(location.pathname, { path: route, exact: true })
	);
	const { state }: any = location;
	const prevScreen = state ? state.from : 0;
	const animationsClassNames =
		currentScreen > prevScreen ? 'slide-forward' : 'slide-backward';

	return (
		<>
			<TransitionGroup
				childFactory={child =>
					React.cloneElement(child, {
						classNames: animationsClassNames,
					})
				}
			>
				<CSSTransition
					key={location.key}
					classNames={animationsClassNames}
					timeout={1500}
				>
					<Switch location={location}>
						<Redirect from="/" to="/login" exact />
						<Route path="/login" component={User} exact />
						<Route path="/list" component={ShoppingList} exact />
						<Route
							path="/list/:id"
							component={ShoppingList}
							exact
						/>
						<Redirect from="/list-detail" to="/list" exact />
						<Route
							path="/list-detail/:id"
							component={ShoppingListDetail}
							exact
						/>
						<Route path="/add" component={AddList} exact />
						<Route path="/add/:id" component={AddList} exact />
					</Switch>
				</CSSTransition>
			</TransitionGroup>
			{React.Children.toArray(children)}
		</>
	);
};

export default RouterProvider;
