import axios from 'axios';
import { call, fork, takeEvery, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import ServerErrorActions from 'core/serverError/actions/ServerErrorActions';
import { ShoppingListDetailEnum } from '../actions/ShoppingListDetailActions';

type commonRequestType = (...args: any[]) => any;

export const addProductReq: commonRequestType = addListData => {
	return axios({
		method: 'post',
		url: 'http://localhost:8080/list-detail',
		withCredentials: true,
		data: addListData,
	});
};

export function* addProductToList(action: any) {
	try {
		// MYTODO 28 Dec 2021 at 22:58:30 : commented block
		// yield put(ProductActions.setLoading(true));
		console.log(action.item);
		const response: {} = yield call(addProductReq, action.item);
		console.log(response);
		// if (response.status === 200) {
		// 	yield put(ProductActions.setProductList(response.data.productList));
		// }
		// yield put(ProductActions.setLoading(false));
	} catch (err) {
		const errors = err.response.data.errors;

		// yield put(ProductActions.setLoading(false));

		if (err.response.status === 401) {
			yield put(push('/'));
		}

		yield put(ServerErrorActions.setError(errors));
		yield put(ServerErrorActions.toggleError(true));
	}
}

export function* watchAddList() {
	yield takeEvery(ShoppingListDetailEnum.ADD_TO_LIST, addProductToList);
}

export default function* rootData() {
	yield fork(watchAddList);
}
