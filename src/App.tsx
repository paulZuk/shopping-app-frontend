import React from 'react';
import RouterProvider from './core/RouterProvider';
import MaterialUIProvider from './core/MaterialUIProvider';
import ServerError from './core/serverError/ServerError';

function App() {
	return (
		<MaterialUIProvider>
			<RouterProvider>
				<ServerError />
			</RouterProvider>
		</MaterialUIProvider>
	);
}

export default App;
