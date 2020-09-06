import { createSelector } from 'reselect';
import { IRootState } from 'reducer';
import { IDetail } from '../reducers/shoppingListDetailReducer';

const getDetailList = createSelector(
	(state: IRootState) => state.shoppingListDetail.get('detailData'),
	detailData => ({
		detailData: detailData as Array<IDetail>,
		types: [
			...new Set(detailData.map((obj: IDetail) => obj.type)),
		] as Array<any>,
	})
);

export default getDetailList;
