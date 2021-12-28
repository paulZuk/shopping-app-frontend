import { Map } from 'immutable';
import { LoadingActionType } from '../actions/createLoadingActions';

const initState = Map({
	loading: false,
});

export type LoadingStateType = Map<string, boolean> & {
	loading: boolean;
}

const loadingReducer = (prefix: string) => (
	state = initState,
	action: LoadingActionType
) => {
	switch (action.type) {
		case `${prefix}_LOADING`:
			return state.set('loading', action.loading);
		default:
			return state;
	}
};

export default loadingReducer;
