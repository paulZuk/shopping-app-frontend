import { createSelector } from 'reselect';
import { IRootState } from 'reducer';

const getFormData = createSelector(
	(state: IRootState) => state.addList.get('data'),
	data => ({
		...data.toObject(),
	})
);

export default getFormData;
