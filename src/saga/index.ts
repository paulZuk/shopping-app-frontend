import { fork } from 'redux-saga/effects';
import LoginSaga from '../view/login/sagas/LoginSagas';

export default function* root() {
	yield fork(LoginSaga);
}
