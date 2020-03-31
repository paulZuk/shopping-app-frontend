import { combineReducers } from 'redux';
import userReducer, { IUserState } from '../view/user/reducer/userReducer';
import serverErrorReducer, {
	IServerError,
} from '../core/serverError/reducers/serverErrorReducer';
export interface IRootState {
	user: IUserState;
	serverError: IServerError;
}

const rootReducer = combineReducers({
	user: userReducer,
	serverError: serverErrorReducer,
});

export default rootReducer;
