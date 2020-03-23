import { fork } from 'redux-saga/effects';
import LoginSaga from '../view/login/sagas/LoginSagas';
import RegisterSaga from '../view/register/sagas/RegisterSagas';

export default function* root() {
	yield fork(LoginSaga);
	yield fork(RegisterSaga);
}
