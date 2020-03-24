import Immutable from 'immutable';
import { UserActions, ISetUserView } from '../actions/UserActions';

const initState = Immutable.Map({
	view: 'login',
});

export interface IUserState extends Immutable.Map<string, string> {
	view: string;
}

const userReducer = (state = initState, action: ISetUserView) => {
	switch (action.type) {
		case UserActions.SET_USER_VIEW:
			return state.set('view', action.view);
		default:
			return state;
	}
};

export default userReducer;
