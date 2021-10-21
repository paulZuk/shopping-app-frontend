import { createSelector } from 'reselect';
import { IRootState } from 'reducer';
import { IDetail } from '../reducers/shoppingListDetailReducer';

const getDetailList = createSelector(
	(state: IRootState) => state.shoppingListDetail.get('detailData'),
	detailData => ({
		detailData: detailData as Array<IDetail>,
		types: detailData
			? [...new Set(detailData.map((obj: IDetail) => obj.type))]
			: [],
	})
);

export default getDetailList;
