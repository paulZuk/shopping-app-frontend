import Immutable from 'immutable';
import { ILoadingAction } from '../actions/createLoadingActions';

const initState = Immutable.Map({
	loading: false,
});

export interface ILoadingState extends Immutable.Map<string, any> {
	loading: boolean;
}

const loadingReducer = (prefix: string) => (
	state = initState,
	action: ILoadingAction
) => {
	switch (action.type) {
		case `${prefix}_LOADING`:
			return state.set('loading', action.loading);
		default:
			return state;
	}
};

export default loadingReducer;
