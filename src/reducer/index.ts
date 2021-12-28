import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import userReducer, { UserStateType } from 'view/user/reducer/userReducer';
import serverErrorReducer, {
	ServerErrorStateType,
} from 'core/serverError/reducers/serverErrorReducer';
import shoppingListReducer, {
	ShoppingListStateType,
} from 'view/shoppingList/reducers/shoppingListReducer';
import shoppingListDetailReducer, {
	ShoppingListDetailStateType,
} from 'view/shoppingListDetail/reducers/shoppingListDetailReducer';
import addListReducer, {
	AddListStateType,
} from 'view/addList/reducers/addListReducer';
import productReducer, {
	ProductStateType,
} from 'view/product/reducers/ProductReducer';

export interface IRootState {
	user: UserStateType;
	serverError: ServerErrorStateType;
	shoppingList: ShoppingListStateType;
	shoppingListDetail: ShoppingListDetailStateType;
	addList: AddListStateType;
	product: ProductStateType;
}

const createRootReducer = (history: History) =>
	combineReducers({
		router: connectRouter(history),
		user: userReducer,
		serverError: serverErrorReducer,
		shoppingList: shoppingListReducer,
		shoppingListDetail: shoppingListDetailReducer,
		addList: addListReducer,
		product: productReducer,
	});

export default createRootReducer;
