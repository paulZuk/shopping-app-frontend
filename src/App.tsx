import React from 'react';
import ServerError from 'core/serverError/ServerError';
import RouterProvider from 'core/RouterProvider';
import MaterialUIProvider from 'core/MaterialUIProvider';

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
