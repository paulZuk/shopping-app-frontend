import { createSelector } from "reselect";
import { IRootState } from "reducer";

const getDeleteId = createSelector(
	(state: IRootState) => state.shoppingList.deleteId,
	deleteId => deleteId
);

export default getDeleteId;
