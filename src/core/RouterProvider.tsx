import React from 'react';
import { Switch, Route } from 'react-router-dom';
import User from 'view/user/User';
import AddList from 'view/addList/AddList';

interface IRouteProvider extends React.Props<{}> {}

const RouterProvider = ({ children }: IRouteProvider) => {
	return (
		<>
			<Switch>
				<Route path="/login" component={User} exact />
				<Route path="/add" component={AddList} exact />
			</Switch>
			{React.Children.toArray(children)}
		</>
	);
};

export default RouterProvider;
