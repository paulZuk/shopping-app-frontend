import { Action } from 'redux';

export enum RegisterActions {
	REGISTER_USER = 'REGISTER_USER',
}

export type UserDataType = {
	name: string;
	password: string;
	email: string;
};

export type RegisterUserActionType = Action<string> & {
	type: RegisterActions.REGISTER_USER;
	userData: UserDataType;
};

const registerUser = (userData: UserDataType): RegisterUserActionType => ({
	type: RegisterActions.REGISTER_USER,
	userData,
});

const registerActions = {
	registerUser,
};

export default registerActions;
