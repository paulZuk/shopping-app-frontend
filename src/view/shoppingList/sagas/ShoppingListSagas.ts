import axios from 'axios';
import { call, fork, takeEvery, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import ServerErrorActions from 'core/serverError/actions/ServerErrorActions';
import ShoppingListActions, {
	ShoppingListActionsEnum,
} from '../actions/ShoppingListActions';
import getDeleteId from '../selectors/getDeleteId';

type commonRequestType = (...args: any[]) => any;

export const shoppingListRequest: commonRequestType = (
	type: 'get' | 'delete',
	id?: string
) => {
	return axios({
		method: type,
		url: 'http://localhost:8080/list',
		withCredentials: true,
		params: {
			id,
		},
	});
};

export function* getShoppingList() {
	try {
		yield put(ShoppingListActions.setLoading(true));
		const response = yield call(shoppingListRequest, 'get');

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

export function* deleteShoppingList() {
	const deleteId = yield select(getDeleteId);
	try {
		yield put(ShoppingListActions.setLoading(true));
		const response = yield call(shoppingListRequest, 'delete', deleteId);

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
