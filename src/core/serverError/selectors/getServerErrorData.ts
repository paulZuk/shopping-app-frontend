import { createSelector } from "reselect";
import { IRootState } from "reducer";

const getServerErrorData = createSelector(
	(state: IRootState) => state.serverError.visible,
	(state: IRootState) => state.serverError.errorData,
	(visible, errorData) => ({ visible, errorData })
);

export default getServerErrorData;
