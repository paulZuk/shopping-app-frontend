import { createSelector } from "reselect";
import { IRootState } from "reducer";

const getUsers = createSelector(
	(state: IRootState) => state.user.loading,
	(state: IRootState) => state.user.users,
	(loading, users) => ({
		loading,
		users,
	})
);

export default getUsers;
