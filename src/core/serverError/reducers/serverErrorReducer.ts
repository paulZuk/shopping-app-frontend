import {
	ServerErrorActions,
	ServerErrorActionTypes,
} from "../actions/ServerErrorActions";

export type ServerErrorStateType = {
	visible: boolean;
	errorData: Array<any>;
};

const initState = {
	visible: false,
	errorData: [] as any[],
};

const serverErrorReducer = (
	state = initState,
	action: ServerErrorActionTypes
) => {
	switch (action.type) {
		case ServerErrorActions.TOGGLE_ERROR:
			return { ...state, visible: action.visible };
		case ServerErrorActions.SET_ERROR:
			return { ...state, errorData: action.data };
		default:
			return state;
	}
};

export default serverErrorReducer;
