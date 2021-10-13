import { fork } from 'redux-saga/effects';
import LoginSaga from 'view/user/login/sagas/LoginSagas';
import RegisterSaga from 'view/user/register/sagas/RegisterSagas';
import AddListSaga from 'view/addList/sagas/AddListSagas';
import UserSaga from 'view/user/sagas/UserSagas';
import ShoppingListSaga from 'view/shoppingList/sagas/ShoppingListSagas';
import ProductSaga from 'view/product/sagas/ProductSagas';
import ShoppingListDetailSaga from 'view/shoppingListDetail/sagas/ShoppingListDetailSagas';

export default function* root() {
	yield fork(LoginSaga);
	yield fork(RegisterSaga);
	yield fork(AddListSaga);
	yield fork(UserSaga);
	yield fork(ShoppingListSaga);
	yield fork(ProductSaga);
	yield fork(ShoppingListDetailSaga);
}
