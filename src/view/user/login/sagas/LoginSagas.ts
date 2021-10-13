import axios from 'axios';
import { push } from 'connected-react-router';
import { call, fork, takeEvery, put } from 'redux-saga/effects';
import { ITryLogin, LoginActions } from '../actions/LoginActions';
import UserActions from 'view/user/actions/UserActions';
import { io } from 'socket.io-client';

type LoginRequestType = (...args: any[]) => any;

const loginRequest: LoginRequestType = data =>
	axios({
		method: 'post',
		url: 'http://localhost:8080/login',
		data: {
			login: data.name,
			password: data.pass,
		},
		withCredentials: true,
	});

export function* tryLogin(action: ITryLogin) {
	const { name, pass } = action;
	try {
		yield put(UserActions.setUserLoading(true));
		const response = yield call(loginRequest, { name, pass });

		if (response.status === 200) {
			yield put(push('/list'));
			yield put(UserActions.setUserLoading(false));
			const socket = io('http://localhost:8080');

			socket.on('connect', () => {
				console.log(socket.connected);
			});
		}
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
