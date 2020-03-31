export enum UserActions {
	SET_USER_VIEW = 'SET_USER_VIEW',
	USER_LOADING = 'USER_LOADING',
}

export interface ISetUserView {
	type: typeof UserActions.SET_USER_VIEW;
	view: string;
}

export interface ISetUserLoading {
	type: typeof UserActions.USER_LOADING;
	loading: boolean;
}

const setUserView = (view: string) => ({
	type: UserActions.SET_USER_VIEW,
	view,
});

const setUserLoading = (loading: boolean) => ({
	type: UserActions.USER_LOADING,
	loading,
});

export type UserActionsTypes = ISetUserView | ISetUserLoading;

export default {
	setUserView,
	setUserLoading,
};
