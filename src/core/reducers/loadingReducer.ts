import { LoadingActionType } from "../actions/createLoadingActions";

const initState = {
	loading: false,
};

export type LoadingStateType = {
	loading: boolean;
};

const loadingReducer = (prefix: string) => (
	state = initState,
	action: LoadingActionType
) => {
	switch (action.type) {
		case `${prefix}_LOADING`:
			return { ...state, loading: action.loading };
		default:
			return state;
	}
};

export default loadingReducer;
