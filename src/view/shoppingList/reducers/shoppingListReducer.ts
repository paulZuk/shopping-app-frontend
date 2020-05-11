import Immutable from 'immutable';
import {
	ShoppingListActionsEnum,
	ShoppingListActionsTypes,
} from '../actions/ShoppingListActions';

const initState = Immutable.Map({
	listData: [] as Array<any>,
	loading: false,
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
		default:
			return state;
	}
};

export default shoppingListReducer;
