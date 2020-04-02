import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from 'reducer';
import sagas from 'saga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);

interface IStorageProviderProps extends React.Props<IStorageProviderProps> { }

const StorageProvider = ({ children }: IStorageProviderProps) => (
	<Provider store={store}>{React.Children.toArray(children)}</Provider>
);

export default StorageProvider;
