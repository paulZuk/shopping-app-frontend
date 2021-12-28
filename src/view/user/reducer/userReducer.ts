import Immutable from 'immutable';
import { UserActions, UserActionsTypes } from '../actions/UserActions';

const initState = Immutable.Map({
	view: 'login',
	loading: false,
	createdSnackBarVisible: false,
	loginSnackBarVisible: false,
	users: Immutable.List(),
});

export type UserStateType = Immutable.Map<string, any> & {
	view: string;
	loading: boolean;
	createdSnackBarVisible: boolean;
	loginSnackBarVisible: boolean;
	users: Immutable.List<{}>;
};

const userReducer = (state = initState, action: UserActionsTypes) => {
	switch (action.type) {
		case UserActions.SET_USER_VIEW:
			return state.set('view', action.view);
		case UserActions.USER_LOADING:
			return state.set('loading', action.loading);
		case UserActions.USER_TOGGLE_CREATED_SNACKBAR:
			return state.set('createdSnackBarVisible', action.open);
		case UserActions.USER_TOGGLE_LOGIN_SNACKBAR:
			return state.set('loginSnackBarVisible', action.open);
		case UserActions.SET_USERS:
			return state.set('users', Immutable.List(action.users));
		default:
			return state;
	}
};

export default userReducer;
