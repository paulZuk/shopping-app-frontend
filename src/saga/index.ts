import { fork } from 'redux-saga/effects';
import LoginSaga from 'view/user/login/sagas/LoginSagas';
import RegisterSaga from 'view/user/register/sagas/RegisterSagas';
import AddListSaga from 'view/addList/sagas/AddListSagas';
import UserSaga from 'view/user/sagas/UserSagas';

export default function* root() {
	yield fork(LoginSaga);
	yield fork(RegisterSaga);
	yield fork(AddListSaga);
	yield fork(UserSaga);
}
