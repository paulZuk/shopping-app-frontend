import axios from 'axios';
import { call, fork, takeEvery, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import ServerErrorActions from 'core/serverError/actions/ServerErrorActions';
import ShoppingListActions, {
	ShoppingListActionsEnum,
} from '../actions/ShoppingListActions';

type commonRequestType = (...args: any[]) => any;

const getShoppingListRequest: commonRequestType = addListData => {
	return axios({
		method: 'get',
		url: 'http://localhost:8080/list',
		withCredentials: true,
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

export function* watchAddList() {
	yield takeEvery(ShoppingListActionsEnum.GET_LIST, getShoppingList);
}

export default function* rootData() {
	yield fork(watchAddList);
}
