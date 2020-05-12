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

export interface IRootState {
	user: IUserState;
	serverError: IServerError;
	shoppingList: IShoppingListState;
}

const createRootReducer = (history: History) =>
	combineReducers({
		router: connectRouter(history),
		user: userReducer,
		serverError: serverErrorReducer,
		shoppingList: shoppingListReducer,
	});

export default createRootReducer;
