import React from 'react';
import ReactDOM from 'react-dom';
import StoreProvider from './core/StoreProvider';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<StoreProvider>
		<App />
	</StoreProvider>,
	document.getElementById('root')
);

serviceWorker.register();
