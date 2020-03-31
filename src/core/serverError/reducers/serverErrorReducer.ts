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
	errorData: [],
});

const serverErrorReducer = (state = initState, action: ServerErrorTypes) => {
	switch (action.type) {
		case ServerErrorActions.ERROR_SHOW:
			return state.merge({
				visible: true,
				errorData: action.errorData,
			});
		case ServerErrorActions.ERROR_HIDE:
			return state.merge(initState);
		default:
			return state;
	}
};

export default serverErrorReducer;
