import { createSelector } from 'reselect';
import { IRootState } from 'reducer';

const getUserData = createSelector(
	(state: IRootState) => state.shoppingList.get('listData'),
	listData => ({
		listData,
	})
);

export default getUserData;
