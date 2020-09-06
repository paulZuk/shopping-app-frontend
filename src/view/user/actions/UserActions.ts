export enum UserActions {
	SET_USER_VIEW = 'SET_USER_VIEW',
	USER_LOADING = 'USER_LOADING',
	USER_TOGGLE_CREATED_SNACKBAR = 'USER_TOGGLE_CREATED_SNACKBAR',
	USER_TOGGLE_LOGIN_SNACKBAR = 'USER_TOGGLE_LOGIN_SNACKBAR',
	GET_USERS = 'GET_USERS',
	SET_USERS = 'SET_USERS',
}

export interface ISetUserView {
	type: typeof UserActions.SET_USER_VIEW;
	view: string;
}

export interface ISetUserLoading {
	type: typeof UserActions.USER_LOADING;
	loading: boolean;
}

export interface ItoggleCreatedSnackBar {
	type: typeof UserActions.USER_TOGGLE_CREATED_SNACKBAR;
	open: boolean;
}

export interface ItoggleLoginSnackBar {
	type: typeof UserActions.USER_TOGGLE_LOGIN_SNACKBAR;
	open: boolean;
}

export interface IGetUsers {
	type: typeof UserActions.GET_USERS;
}

export interface ISetUsers {
	type: typeof UserActions.SET_USERS;
	users: Array<{}>;
}

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
	| ISetUserView
	| ISetUserLoading
	| ItoggleCreatedSnackBar
	| ItoggleLoginSnackBar
	| IGetUsers
	| ISetUsers;

export default {
	setUserView,
	setUserLoading,
	toggleCreatedSnackBar,
	toggleLoginSnackBar,
	getUsers,
	setUsers,
};
