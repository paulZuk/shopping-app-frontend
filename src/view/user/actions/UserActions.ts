export enum UserActions {
	SET_USER_VIEW = 'SET_USER_VIEW',
	SHOW_EXISTING_USER_MSG = 'SHOW_EXISTING_USER_MSG',
	HIDE_EXISTING_USER_MSG = 'HIDE_EXISTING_USER_MSG',
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

export type UserActionsTypes =
	| ISetUserView
	| IShowExistingUserMsg
	| IHideExistingUserMsg;

export default {
	setUserView,
	showExistingUserMsg,
	hideExistingUserMsg,
};
