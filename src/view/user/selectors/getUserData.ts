import { createSelector } from 'reselect';
import { IRootState } from 'reducer';

const getUserData = createSelector(
	(state: IRootState) => state.user.get('loading'),
	(state: IRootState) => state.user.get('view'),
	(state: IRootState) => state.user.get('snackBarVisible'),
	(loading, view, snackBarVisible) => ({ loading, view, snackBarVisible })
);

export default getUserData;
