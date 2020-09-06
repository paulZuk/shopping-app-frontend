export enum ServerErrorActions {
	TOGGLE_ERROR = 'TOGGLE_ERROR',
	SET_ERROR = 'SET_ERROR',
}

interface IToggleError {
	type: typeof ServerErrorActions.TOGGLE_ERROR;
	visible: boolean;
}

interface ISetError {
	type: typeof ServerErrorActions.SET_ERROR;
	data: Array<any>;
}

const setError = (data: Array<any>) => ({
	type: ServerErrorActions.SET_ERROR,
	data,
});

const toggleError = (visible: boolean) => ({
	type: ServerErrorActions.TOGGLE_ERROR,
	visible,
});

export type ServerErrorTypes = IToggleError | ISetError;

export default {
	toggleError,
	setError,
};
