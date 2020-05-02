import Immutable from 'immutable';
import {
	ShoppingListActionsEnum,
	ShoppingListActionsTypes,
} from '../actions/ShoppingListActions';

const initState = Immutable.Map({
	listData: [] as Array<any>,
});

export interface IShoppingListState extends Immutable.Map<string, any> {
	listData: Array<any>;
}

const shoppingListReducer = (
	state = initState,
	action: ShoppingListActionsTypes
) => {
	switch (action.type) {
		case ShoppingListActionsEnum.SET_LIST:
			return state.set('listData', action.lists);
		default:
			return state;
	}
};

export default shoppingListReducer;
