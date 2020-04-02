import Immutable from 'immutable';
import { UserActions, UserActionsTypes } from '../actions/UserActions';

const initState = Immutable.Map({
	view: 'login',
	loading: false,
});

export interface IUserState extends Immutable.Map<string, any> {
	view: string;
	loading: boolean;
}

const userReducer = (state = initState, action: UserActionsTypes) => {
	switch (action.type) {
		case UserActions.SET_USER_VIEW:
			return state.set('view', action.view);
		case UserActions.USER_LOADING:
			return state.set('loading', action.loading);
		default:
			return state;
	}
};

export default userReducer;
