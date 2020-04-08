import axios from 'axios';
import { call, fork, takeEvery } from 'redux-saga/effects';
import { ITryLogin, LoginActions } from '../actions/LoginActions';

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
		const response = yield call(loginRequest, { name, pass });
		console.log(response);
	} catch (e) {
		console.log(e);
	}
}

export function* watchTryLogin() {
	yield takeEvery(LoginActions.LOGIN_TRY_LOGIN, tryLogin);
}

export default function* rootData() {
	yield fork(watchTryLogin);
}
