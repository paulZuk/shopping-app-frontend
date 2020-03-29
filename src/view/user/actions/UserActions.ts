export enum UserActions {
	SET_USER_VIEW = 'SET_USER_VIEW',
	SHOW_EXISTING_USER_MSG = 'SHOW_EXISTING_USER_MSG',
	HIDE_EXISTING_USER_MSG = 'HIDE_EXISTING_USER_MSG',
	USER_LOADING = 'USER_LOADING',
}

export interface ISetUserView {
	type: typeof UserActions.SET_USER_VIEW;
	view: string;
}

export interface IShowExistingUserMsg {
	type: typeof UserActions.SHOW_EXISTING_USER_MSG;
}

export interface IHideExistingUserMsg {
	type: typeof UserActions.HIDE_EXISTING_USER_MSG;
}

export interface ISetUserLoading {
	type: typeof UserActions.USER_LOADING;
	loading: boolean;
}

const setUserView = (view: string) => ({
	type: UserActions.SET_USER_VIEW,
	view,
});

const showExistingUserMsg = () => ({
	type: UserActions.SHOW_EXISTING_USER_MSG,
});

const hideExistingUserMsg = () => ({
	type: UserActions.HIDE_EXISTING_USER_MSG,
});

const setUserLoading = (loading: boolean) => ({
	type: UserActions.USER_LOADING,
	loading,
});

export type UserActionsTypes =
	| ISetUserView
	| IShowExistingUserMsg
	| IHideExistingUserMsg
	| ISetUserLoading;

export default {
	setUserView,
	showExistingUserMsg,
	hideExistingUserMsg,
	setUserLoading,
};
