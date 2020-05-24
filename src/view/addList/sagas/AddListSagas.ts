import axios from 'axios';
import { push } from 'connected-react-router';
import { call, fork, takeEvery, put } from 'redux-saga/effects';
import ServerErrorActions from 'core/serverError/actions/ServerErrorActions';
import AddListActions, {
	IAddList,
	AddListActions as AddListActionsEnum,
	ILoadListData,
} from '../actions/AddListActions';
import { getShoppingListRequest } from 'view/shoppingList/sagas/ShoppingListSagas';

type addListRequestType = (...args: any[]) => any;

const addListRequest: addListRequestType = addListData => {
	const { listName, priority, shared } = addListData;
	return axios({
		method: 'post',
		url: 'http://localhost:8080/list',
		data: {
			listName,
			priority,
			shared,
		},
		withCredentials: true,
	});
};

export function* addList(action: IAddList) {
	const data = action.addListData;
	try {
		const response = yield call(addListRequest, { ...data });

		if (response.status === 200) {
			yield put(push('/list'));
		}
	} catch (err) {
		const errors = err.response.data.errors;

		if (err.response.status === 422) {
			yield put(ServerErrorActions.setError(errors));
			yield put(ServerErrorActions.toggleError(true));
		}
	}
}

export function* loadListData(action: ILoadListData) {
	const id = action.id;
	try {
		yield put(AddListActions.setLoading(true));
		const response = yield call(getShoppingListRequest, id);

		if (response.status === 200) {
			yield put(AddListActions.loadForm(response.data[0]));
		}

		yield put(AddListActions.setLoading(false));
	} catch (err) {
		const errors = err.response.data.errors;
		yield put(AddListActions.setLoading(false));
		if (err.response.status === 401) {
			yield put(push('/'));
		}
		yield put(ServerErrorActions.setError(errors));
		yield put(ServerErrorActions.toggleError(true));
	}
}

export function* watchAddList() {
	yield takeEvery(AddListActionsEnum.ADD_LIST, addList);
}

export function* watchLoadListData() {
	yield takeEvery(AddListActionsEnum.LOAD_LIST_DATA, loadListData);
}

export default function* rootData() {
	yield fork(watchAddList);
	yield fork(watchLoadListData);
}
