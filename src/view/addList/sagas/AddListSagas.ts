import axios from 'axios';
import { push } from 'connected-react-router';
import { call, fork, takeEvery, put } from 'redux-saga/effects';
import ServerErrorActions from 'core/serverError/actions/ServerErrorActions';
import { IAddList, AddListActions } from '../actions/AddListActions';

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

export function* watchAddList() {
	yield takeEvery(AddListActions.ADD_LIST, addList);
}

export default function* rootData() {
	yield fork(watchAddList);
}
