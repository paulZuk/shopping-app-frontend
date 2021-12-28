import { Map } from 'immutable';
import {
	ServerErrorActions,
	ServerErrorActionTypes,
} from '../actions/ServerErrorActions';

export type ServerErrorStateType = Map<string, any> & {
	visible: boolean;
	errorData: Array<any>;
}

const initState = Map({
	visible: false,
	errorData: [] as any[],
});

const serverErrorReducer = (state = initState, action: ServerErrorActionTypes) => {
	switch (action.type) {
		case ServerErrorActions.TOGGLE_ERROR:
			return state.set('visible', action.visible);
		case ServerErrorActions.SET_ERROR:
			return state.set('errorData', action.data);
		default:
			return state;
	}
};

export default serverErrorReducer;
