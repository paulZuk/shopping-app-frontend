import Immutable from 'immutable';
import {
	ServerErrorActions,
	ServerErrorTypes,
} from '../actions/ServerErrorActions';

export interface IServerError extends Immutable.Map<string, any> {
	visible: boolean;
	errorData: Array<any>;
}

const initState = Immutable.Map({
	visible: false,
	errorData: [] as Array<any>,
});

const serverErrorReducer = (state = initState, action: ServerErrorTypes) => {
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
