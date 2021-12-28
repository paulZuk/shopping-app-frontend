export enum ServerErrorActions {
	TOGGLE_ERROR = 'TOGGLE_ERROR',
	SET_ERROR = 'SET_ERROR',
}

export type ToggleErrorActionType = {
	type: typeof ServerErrorActions.TOGGLE_ERROR;
	visible: boolean;
}

export type SetErrorActionType = {
	type: typeof ServerErrorActions.SET_ERROR;
	data: Array<any>;
}

const setError = (data: never[]) => ({
	type: ServerErrorActions.SET_ERROR,
	data,
});

const toggleError = (visible: boolean) => ({
	type: ServerErrorActions.TOGGLE_ERROR,
	visible,
});

export type ServerErrorActionTypes = ToggleErrorActionType | SetErrorActionType;

const serverErrorActions = {
	toggleError,
	setError,
};

export default serverErrorActions;
