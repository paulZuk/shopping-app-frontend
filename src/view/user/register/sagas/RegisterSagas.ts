import axios from 'axios';
import { call, fork, takeEvery, put } from 'redux-saga/effects';
import ServerErrorActions from 'core/serverError/actions/ServerErrorActions';
import { IRegisterUser, RegisterActions } from '../actions/RegisterActions';
import UserActions from '../../actions/UserActions';

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
		yield put(UserActions.setUserLoading(true));
		const response = yield call(regiserRequest, { ...data });

		if (response.status === 200) {
			yield put(UserActions.toggleCreatedSnackBar(true));
			yield put(UserActions.setUserView('login'));
		}

		yield put(UserActions.setUserLoading(false));
	} catch (err) {
		const errors = err.response.data.errors;

		if (err.response.status === 422) {
			yield put(ServerErrorActions.showError(errors));
		}

		yield put(UserActions.setUserLoading(false));
	}
}

export function* watchRegister() {
	yield takeEvery(RegisterActions.REGISTER_USER, register);
}

export default function* rootData() {
	yield fork(watchRegister);
}
