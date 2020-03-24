import userReducer from '../view/user/reducer/userReducer';
import { combineReducers } from 'redux';
import { IUserState } from '../view/user/reducer/userReducer';
export interface IRootState {
	user: IUserState;
}

const rootReducer = combineReducers({
	user: userReducer,
});

export default rootReducer;
