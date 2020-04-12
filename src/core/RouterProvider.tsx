import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import User from 'view/user/User';
import Layout from 'core/components/Layout';

interface IRouteProvider extends React.Props<{}> {}

const RouterProvider = ({ children }: IRouteProvider) => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login" component={User} exact />
				<Route path="/" component={Layout} exact />
			</Switch>
			{React.Children.toArray(children)}
		</BrowserRouter>
	);
};

export default RouterProvider;
