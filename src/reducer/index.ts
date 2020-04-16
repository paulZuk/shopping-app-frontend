import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import userReducer, { IUserState } from 'view/user/reducer/userReducer';
import serverErrorReducer, {
	IServerError,
} from 'core/serverError/reducers/serverErrorReducer';
export interface IRootState {
	user: IUserState;
	serverError: IServerError;
}

const createRootReducer = (history: History) =>
	combineReducers({
		router: connectRouter(history),
		user: userReducer,
		serverError: serverErrorReducer,
	});

export default createRootReducer;
