import axios from 'axios';
import { call, fork, takeEvery } from 'redux-saga/effects';
import { IRegisterUser, RegisterActions } from '../actions/RegisterActions';

type registerRequestType = (...args: any[]) => any;

const regiserRequest: registerRequestType = userData => {
	const { name, password, email } = userData;
	return axios({
		method: 'post',
		url: 'http://localhost:8080/user',
		data: {
			name,
			password,
			email,
		},
	});
};

export function* register(action: IRegisterUser) {
	const data = action.userData;
	try {
		const response = yield call(regiserRequest, { ...data });
		console.log(response);
	} catch (e) {
		console.log(e);
	}
}

export function* watchRegister() {
	yield takeEvery(RegisterActions.REGISTER_USER, register);
}

export default function* rootData() {
	yield fork(watchRegister);
}
