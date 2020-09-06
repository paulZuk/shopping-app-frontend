import axios from 'axios';
import { call, fork, takeEvery, put } from 'redux-saga/effects';
import ServerErrorActions from 'core/serverError/actions/ServerErrorActions';
import UserActions, {
	UserActions as UserActionsConst,
} from '../actions/UserActions';

type requestType = (...args: any[]) => any;

const getUsersRequest: requestType = () => {
	return axios({
		method: 'get',
		url: 'http://localhost:8080/user',
		withCredentials: true,
		params: {
			withoutMe: true,
		},
	});
};

export function* getUsers() {
	try {
		yield put(UserActions.setUserLoading(true));
		const response = yield call(getUsersRequest);

		if (response.status === 200) {
			yield put(UserActions.setUsers(response.data.users));
		}

		yield put(UserActions.setUserLoading(false));
	} catch (err) {
		const errors = err.response.data.errors;

		if (err.response.status === 422) {
			yield put(ServerErrorActions.setError(errors));
			yield put(ServerErrorActions.toggleError(true));
		}

		yield put(UserActions.setUserLoading(false));
	}
}

export function* watchGetUsers() {
	yield takeEvery(UserActionsConst.GET_USERS, getUsers);
}

export default function* rootData() {
	yield fork(watchGetUsers);
}
