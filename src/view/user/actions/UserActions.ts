export enum UserActions {
	SET_USER_VIEW = 'SET_USER_VIEW',
	USER_LOADING = 'USER_LOADING',
	USER_TOGGLE_CREATED_SNACKBAR = 'USER_TOGGLE_CREATED_SNACKBAR',
	USER_TOGGLE_LOGIN_SNACKBAR = 'USER_TOGGLE_LOGIN_SNACKBAR',
	GET_USERS = 'GET_USERS',
	SET_USERS = 'SET_USERS',
}

export type SetUserViewActionType = {
	type: typeof UserActions.SET_USER_VIEW;
	view: string;
};

export type SetUserLoadingActionType = {
	type: typeof UserActions.USER_LOADING;
	loading: boolean;
};

export type ToggleCreatedSnackBarActionType = {
	type: typeof UserActions.USER_TOGGLE_CREATED_SNACKBAR;
	open: boolean;
};

export type ToggleLoginSnackBarActionType = {
	type: typeof UserActions.USER_TOGGLE_LOGIN_SNACKBAR;
	open: boolean;
};

export type GetUsersActionType = {
	type: typeof UserActions.GET_USERS;
};

export type SetUsersActionType = {
	type: typeof UserActions.SET_USERS;
	users: Array<{}>;
};

const setUserView = (view: string) => ({
	type: UserActions.SET_USER_VIEW,
	view,
});

const setUserLoading = (loading: boolean) => ({
	type: UserActions.USER_LOADING,
	loading,
});

const toggleCreatedSnackBar = (open: boolean) => ({
	type: UserActions.USER_TOGGLE_CREATED_SNACKBAR,
	open,
});

const toggleLoginSnackBar = (open: boolean) => ({
	type: UserActions.USER_TOGGLE_LOGIN_SNACKBAR,
	open,
});

const getUsers = () => ({
	type: UserActions.GET_USERS,
});

const setUsers = (users: Array<{}>) => ({
	type: UserActions.SET_USERS,
	users,
});

export type UserActionsTypes =
	| SetUserViewActionType
	| SetUserLoadingActionType
	| ToggleCreatedSnackBarActionType
	| ToggleLoginSnackBarActionType
	| GetUsersActionType
	| SetUsersActionType;

const userActions = {
	setUserView,
	setUserLoading,
	toggleCreatedSnackBar,
	toggleLoginSnackBar,
	getUsers,
	setUsers,
};

export default userActions;
