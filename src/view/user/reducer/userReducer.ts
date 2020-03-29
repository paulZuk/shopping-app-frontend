import Immutable from 'immutable';
import { UserActions, UserActionsTypes } from '../actions/UserActions';

const initState = Immutable.Map({
	view: 'login',
	userExist: false,
});

export interface IUserState extends Immutable.Map<string, any> {
	view: string;
	userExist: boolean;
}

const userReducer = (state = initState, action: UserActionsTypes) => {
	switch (action.type) {
		case UserActions.SET_USER_VIEW:
			return state.set('view', action.view);
		case UserActions.SHOW_EXISTING_USER_MSG:
			return state.set('userExist', true);
		case UserActions.HIDE_EXISTING_USER_MSG:
			return state.set('userExist', false);
		default:
			return state;
	}
};

export default userReducer;