import axios from 'axios';
import { call, fork, takeEvery, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import ServerErrorActions from 'core/serverError/actions/ServerErrorActions';
import ShoppingListActions, {
	ShoppingListActionsEnum,
	IDeleteList,
} from '../actions/ShoppingListActions';

type commonRequestType = (...args: any[]) => any;

const getShoppingListRequest: commonRequestType = () => {
	return axios({
		method: 'get',
		url: 'http://localhost:8080/list',
		withCredentials: true,
	});
};

const deleteShoppingListRequest: commonRequestType = id => {
	return axios({
		method: 'delete',
		url: 'http://localhost:8080/list',
		withCredentials: true,
		data: {
			id,
		},
	});
};

export function* getShoppingList() {
	try {
		yield put(ShoppingListActions.setLoading(true));
		const response = yield call(getShoppingListRequest);

		if (response.status === 200) {
			yield put(ShoppingListActions.setLists(response.data.shoppingList));
		}

		yield put(ShoppingListActions.setLoading(false));
	} catch (err) {
		const errors = err.response.data.errors;

		yield put(ShoppingListActions.setLoading(false));

		if (err.response.status === 401) {
			yield put(push('/'));
		}

		yield put(ServerErrorActions.setError(errors));
		yield put(ServerErrorActions.toggleError(true));
	}
}

export function* deleteShoppingList(action: IDeleteList) {
	const id = action.id;
	try {
		yield put(ShoppingListActions.setLoading(true));
		const response = yield call(deleteShoppingListRequest, id);

		if (response.status === 200) {
		}

		yield put(ShoppingListActions.setLoading(false));
	} catch (err) {
		const errors = err.response.data.errors;

		yield put(ShoppingListActions.setLoading(false));

		if (err.response.status === 401) {
			yield put(push('/'));
		}

		yield put(ServerErrorActions.setError(errors));
		yield put(ServerErrorActions.toggleError(true));
	}
}

export function* watchAddList() {
	yield takeEvery(ShoppingListActionsEnum.GET_LIST, getShoppingList);
}
export function* watchDeleteList() {
	yield takeEvery(ShoppingListActionsEnum.DELETE_LIST, deleteShoppingList);
}

export default function* rootData() {
	yield fork(watchAddList);
	yield fork(watchDeleteList);
}
