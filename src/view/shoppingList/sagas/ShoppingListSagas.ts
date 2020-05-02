import axios from 'axios';
import { call, fork, takeEvery, put } from 'redux-saga/effects';
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
		const response = yield call(getShoppingListRequest);

		if (response.status === 200) {
			console.log(response.data);
			yield put(ShoppingListActions.setLists(response.data.shoppingList));
		}
	} catch (err) {
		const errors = err.response.data.errors;

		if (err.response.status === 422) {
			yield put(ServerErrorActions.showError(errors));
		}
	}
}

export function* watchAddList() {
	yield takeEvery(ShoppingListActionsEnum.GET_LIST, getShoppingList);
}

export default function* rootData() {
	yield fork(watchAddList);
}
