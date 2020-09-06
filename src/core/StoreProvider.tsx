import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import createRootReducer from 'reducer';
import sagas from 'saga';

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

const composeEnhancers =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	createRootReducer(history),
	composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

sagaMiddleware.run(sagas);

interface IStorageProviderProps extends React.Props<IStorageProviderProps> {}

const StorageProvider = ({ children }: IStorageProviderProps) => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			{React.Children.toArray(children)}
		</ConnectedRouter>
	</Provider>
);

export default StorageProvider;
