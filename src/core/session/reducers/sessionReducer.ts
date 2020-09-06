import { SessionActions } from '../actions/SessionActions';

const sessionReducer = (state: any, action: any) => {
	switch (action.type) {
		case SessionActions.SET_LOGGED:
			return state.set('logged', action.isLogged);
		default:
			return state;
	}
};

export default sessionReducer;
