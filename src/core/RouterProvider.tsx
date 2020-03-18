import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../view/login/Login';

const RouterProvider = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login" component={Login} exact />
			</Switch>
		</BrowserRouter>
	);
};

export default RouterProvider;
