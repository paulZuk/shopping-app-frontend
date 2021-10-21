import axios from 'axios';
import { call, fork, takeEvery, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import ServerErrorActions from 'core/serverError/actions/ServerErrorActions';
import ShoppingListActions, {
	ShoppingListActionsEnum,
	IDeleteList,
} from '../actions/ShoppingListActions';
import getDeleteId from '../selectors/getDeleteId';

type commonRequestType = (...args: any[]) => any;

export const getShoppingListRequest: commonRequestType = (id?: string) => {
	return axios({
		method: 'get',
		url: 'http://localhost:8080/list',
		withCredentials: true,
		params: {
			id,
		},
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
		const response: {
			status: number;
			data: { shoppingList: any };
		} = yield call(getShoppingListRequest);

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
	const deleteId: number = yield select(getDeleteId);
	try {
		yield put(ShoppingListActions.setLoading(true));
		const response: { status: number } = yield call(
			deleteShoppingListRequest,
			deleteId
		);

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
