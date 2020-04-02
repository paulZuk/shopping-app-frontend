import { createSelector } from 'reselect';
import { IRootState } from 'reducer';

const getServerErrorData = createSelector(
	(state: IRootState) => state.serverError.get('visible'),
	(state: IRootState) => state.serverError.get('errorData'),
	(visible, errorData) => ({ visible, errorData })
);

export default getServerErrorData;
