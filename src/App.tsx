import React from 'react';
import RouterProvider from './core/RouterProvider';
import MaterialUIProvider from './core/MaterialUIProvider';

function App() {
	return (
		<MaterialUIProvider>
			<RouterProvider />
		</MaterialUIProvider>
	);
}

export default App;
