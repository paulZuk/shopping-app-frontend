import { createSelector } from 'reselect';
import { IRootState } from 'reducer';

const getUsers = createSelector(
	(state: IRootState) => state.user.get('loading'),
	(state: IRootState) => state.user.get('users'),
	(loading, users) => ({
		loading,
		users,
	})
);

export default getUsers;
