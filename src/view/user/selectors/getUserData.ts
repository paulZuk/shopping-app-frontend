import { createSelector } from "reselect";
import { IRootState } from "reducer";

const getUserData = createSelector(
	(state: IRootState) => state.user.loading,
	(state: IRootState) => state.user.view,
	(state: IRootState) => state.user.createdSnackBarVisible,
	(state: IRootState) => state.user.loginSnackBarVisible,
	(loading, view, createdSnackBarVisible, loginSnackBarVisible) => ({
		loading,
		view,
		createdSnackBarVisible,
		loginSnackBarVisible,
	})
);

export default getUserData;
