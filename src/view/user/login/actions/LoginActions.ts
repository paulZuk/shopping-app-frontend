import { Action } from 'redux';

export enum LoginActions {
	LOGIN_TRY_LOGIN = 'LOGIN_TRY_LOGIN',
}

export interface ITryLogin extends Action<LoginActions.LOGIN_TRY_LOGIN> {
	name: string;
	pass: string;
}
export const tryLogin = (name: string, pass: string): ITryLogin => ({
	type: LoginActions.LOGIN_TRY_LOGIN,
	name,
	pass,
});

const loginActions = {
	tryLogin,
};

export default loginActions;
