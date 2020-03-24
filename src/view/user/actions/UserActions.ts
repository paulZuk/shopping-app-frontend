export enum UserActions {
	SET_USER_VIEW = 'SET_USER_VIEW',
}

export interface ISetUserView {
	type: typeof UserActions.SET_USER_VIEW;
	view: string;
}

const setUserView = (view: string) => ({
	type: UserActions.SET_USER_VIEW,
	view,
});

export default {
	setUserView,
};
