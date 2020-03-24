import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import User from '../view/user/User';

const RouterProvider = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login" component={User} exact />
			</Switch>
		</BrowserRouter>
	);
};

export default RouterProvider;
