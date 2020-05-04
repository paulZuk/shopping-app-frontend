import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import User from 'view/user/User';
import AddList from 'view/addList/AddList';
import ShoppingList from 'view/shoppingList/ShoppingList';

interface IRouteProvider extends React.Props<{}> {}

const RouterProvider = ({ children }: IRouteProvider) => {
	return (
		<>
			<Switch>
				<Redirect from="/" to="/login" exact />
				<Route path="/login" component={User} exact />
				<Route path="/list" component={ShoppingList} exact />
				<Route path="/add" component={AddList} exact />
			</Switch>
			{React.Children.toArray(children)}
		</>
	);
};

export default RouterProvider;
