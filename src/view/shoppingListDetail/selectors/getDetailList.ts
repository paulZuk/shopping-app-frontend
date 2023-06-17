import { createSelector } from "reselect";
import { IRootState } from "reducer";
import { DetailType } from "../reducers/shoppingListDetailReducer";

const getDetailList = createSelector(
	(state: IRootState) => state.shoppingListDetail.detailData,
	detailData => ({
		detailData: detailData as Array<DetailType>,
		types: detailData
			? [...new Set(detailData.map((obj: DetailType) => obj.type))]
			: [],
	})
);

export default getDetailList;
