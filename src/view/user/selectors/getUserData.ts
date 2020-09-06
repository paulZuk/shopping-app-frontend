import { createSelector } from 'reselect';
import { IRootState } from 'reducer';

const getUserData = createSelector(
	(state: IRootState) => state.user.get('loading'),
	(state: IRootState) => state.user.get('view'),
	(state: IRootState) => state.user.get('createdSnackBarVisible'),
	(state: IRootState) => state.user.get('loginSnackBarVisible'),
	(loading, view, createdSnackBarVisible, loginSnackBarVisible) => ({
		loading,
		view,
		createdSnackBarVisible,
		loginSnackBarVisible,
	})
);

export default getUserData;
