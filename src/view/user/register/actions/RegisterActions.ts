import { Action } from 'redux';

export enum RegisterActions {
	REGISTER_USER = 'REGISTER_USER',
}

interface IUserData {
	name: string;
	password: string;
	email: string;
}

export interface IRegisterUser extends Action<string> {
	type: RegisterActions.REGISTER_USER;
	userData: IUserData;
}

const registerUser = (userData: IUserData): IRegisterUser => ({
	type: RegisterActions.REGISTER_USER,
	userData,
});

export default {
	registerUser,
};
