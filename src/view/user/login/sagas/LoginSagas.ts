import axios from 'axios';
import { call, fork, takeEvery, put } from 'redux-saga/effects';
import { ITryLogin, LoginActions } from '../actions/LoginActions';
import UserActions from 'view/user/actions/UserActions';

type LoginRequestType = (...args: any[]) => any;

const loginRequest: LoginRequestType = data =>
	axios({
		method: 'post',
		url: 'http://localhost:8080/login',
		data: {
			login: data.name,
			password: data.pass,
		},
	});

export function* tryLogin(action: ITryLogin) {
	const { name, pass } = action;
	try {
		yield put(UserActions.setUserLoading(true));
		const response = yield call(loginRequest, { name, pass });
		console.log(response);
		yield put(UserActions.setUserLoading(false));
	} catch (e) {
		yield put(UserActions.setUserLoading(false));
		yield put(UserActions.toggleLoginSnackBar(true));
	}
}

export function* watchTryLogin() {
	yield takeEvery(LoginActions.LOGIN_TRY_LOGIN, tryLogin);
}

export default function* rootData() {
	yield fork(watchTryLogin);
}
