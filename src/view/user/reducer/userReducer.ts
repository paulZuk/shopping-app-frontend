import { UserActions, UserActionsTypes } from "../actions/UserActions";

const initState = {
	view: "login",
	loading: false,
	createdSnackBarVisible: false,
	loginSnackBarVisible: false,
	users: [],
};

export type UserStateType = {
	view: string;
	loading: boolean;
	createdSnackBarVisible: boolean;
	loginSnackBarVisible: boolean;
	users: any[];
};

const userReducer = (state = initState, action: UserActionsTypes) => {
	switch (action.type) {
		case UserActions.SET_USER_VIEW:
			return { ...state, view: action.view };
		case UserActions.USER_LOADING:
			return { ...state, loading: action.loading };
		case UserActions.USER_TOGGLE_CREATED_SNACKBAR:
			return { ...state, createdSnackBarVisible: action.open };
		case UserActions.USER_TOGGLE_LOGIN_SNACKBAR:
			return { ...state, loginSnackBarVisible: action.open };
		case UserActions.SET_USERS:
			return { ...state, users: action.users };
		default:
			return state;
	}
};

export default userReducer;
