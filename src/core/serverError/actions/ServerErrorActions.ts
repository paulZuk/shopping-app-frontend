import Immutable from 'immutable';

export enum ServerErrorActions {
	ERROR_SHOW = 'ERROR_SHOW',
	ERROR_HIDE = 'ERROR_HIDE',
}

interface IShowError {
	type: typeof ServerErrorActions.ERROR_SHOW;
	errorData: Array<any>;
}

interface IHideError {
	type: typeof ServerErrorActions.ERROR_HIDE;
}

const showError = (errorData: Array<any>) => ({
	type: ServerErrorActions.ERROR_SHOW,
	errorData,
});

const hideError = () => ({
	type: ServerErrorActions.ERROR_HIDE,
});

export type ServerErrorTypes = IShowError | IHideError;

export default {
	showError,
	hideError,
};
