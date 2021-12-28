import { Map } from 'immutable';
import { ShoppingListDetailEnum } from '../actions/ShoppingListDetailActions';

const initState = Map({
	detailData: [] as Array<DetailType>,
});

export type DetailType = {
	_id: string;
	type: string;
	checked: boolean;
	name: string;
};

export type ShoppingListDetailStateType = Map<string, DetailType[]> & {
	detailData: DetailType[];
};

const shoppingListDetailReducer = (state = initState, action: any) => {
	switch (action.type) {
		case ShoppingListDetailEnum.DETAIL_TOGGLE_CHECKED:
			const data = state.get('detailData') || [];
			const newData = data?.map(data => {
				if (data._id === action.id) {
					return {
						...data,
						checked: !data.checked,
					};
				}
				return data;
			});
			return state.set('detailData', newData);
		case ShoppingListDetailEnum.SET_LOADING:
			return state.set('loading', action.loading);
		case ShoppingListDetailEnum.ADD_TO_LIST:
			const newState = [
				...(state.get('detailData') as any[]),
				action.item,
			];

			return state.set(
				'detailData',
				newState.filter((item, pos) => newState.indexOf(item) === pos)
			);
		case ShoppingListDetailEnum.REMOVE_FROM_LIST:
			const filteredArray =
				state
					.get('detailData')
					?.filter(elem => elem._id !== action.id) || [];
			return state.set('detailData', filteredArray);
		case ShoppingListDetailEnum.SET_DETAIL_DATA:
			return state.set('detailData', action.data);
		default:
			return state;
	}
};

export default shoppingListDetailReducer;
