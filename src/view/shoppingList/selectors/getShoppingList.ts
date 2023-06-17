import { createSelector } from "reselect";
import { IRootState } from "reducer";

const getShoppingList = createSelector(
	(state: IRootState) => state.shoppingList.listData,
	(state: IRootState) => state.shoppingList.loading,
	(listData, loading) => ({
		listData,
		loading,
	})
);

export default getShoppingList;
