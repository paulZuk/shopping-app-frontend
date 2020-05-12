import { createSelector } from 'reselect';
import { IRootState } from 'reducer';

const getUserData = createSelector(
	(state: IRootState) => state.shoppingList.get('listData'),
	(state: IRootState) => state.shoppingList.get('loading'),
	(listData, loading) => ({
		listData,
		loading,
	})
);

export default getUserData;
