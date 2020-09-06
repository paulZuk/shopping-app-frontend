import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import userReducer, { IUserState } from 'view/user/reducer/userReducer';
import serverErrorReducer, {
	IServerError,
} from 'core/serverError/reducers/serverErrorReducer';
import shoppingListReducer, {
	IShoppingListState,
} from 'view/shoppingList/reducers/shoppingListReducer';
import shoppingListDetailReducer, {
	IShoppingListDetailtState,
} from 'view/shoppingListDetail/reducers/shoppingListDetailReducer';
import addListReducer, { IAddList } from 'view/addList/reducers/addListReducer';

export interface IRootState {
	user: IUserState;
	serverError: IServerError;
	shoppingList: IShoppingListState;
	shoppingListDetail: IShoppingListDetailtState;
	addList: IAddList;
}

const createRootReducer = (history: History) =>
	combineReducers({
		router: connectRouter(history),
		user: userReducer,
		serverError: serverErrorReducer,
		shoppingList: shoppingListReducer,
		shoppingListDetail: shoppingListDetailReducer,
		addList: addListReducer,
	});

export default createRootReducer;
