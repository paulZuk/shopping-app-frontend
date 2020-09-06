import Immutable from 'immutable';
import {
	ShoppingListActionsEnum,
	ShoppingListActionsTypes,
} from '../actions/ShoppingListActions';

const initState = Immutable.Map({
	listData: [] as Array<any>,
	loading: false,
	deleteId: '',
});

export interface IShoppingListState extends Immutable.Map<string, any> {
	listData: Array<any>;
	loading: boolean;
}

const shoppingListReducer = (
	state = initState,
	action: ShoppingListActionsTypes
) => {
	switch (action.type) {
		case ShoppingListActionsEnum.SET_LIST:
			return state.set('listData', action.lists);
		case ShoppingListActionsEnum.SET_LOADING:
			return state.set('loading', action.loading);
		case ShoppingListActionsEnum.SET_DELETE_ID:
			return state.set('deleteId', action.id);
		case ShoppingListActionsEnum.DELETE_LIST:
			const listData = state.get('listData');
			const deleteId = state.get('deleteId');

			if (!Array.isArray(listData)) {
				return state;
			}

			const list = listData.filter(item => {
				return item._id !== deleteId;
			});

			return state.set('listData', list);
		default:
			return state;
	}
};

export default shoppingListReducer;
