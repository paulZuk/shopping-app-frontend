export enum SessionActions {
	SET_LOGGED = 'SET_LOGGED',
}

const setLogged = (isLogged: boolean) => {
	return {
		type: typeof SessionActions.SET_LOGGED,
		isLogged,
	};
};

export default {
	setLogged,
};
