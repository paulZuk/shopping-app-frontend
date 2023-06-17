import { createSelector } from "reselect";
import { IRootState } from "reducer";

const getFormData = createSelector(
	(state: IRootState) => state.addList.data,
	data => data
);

export default getFormData;
