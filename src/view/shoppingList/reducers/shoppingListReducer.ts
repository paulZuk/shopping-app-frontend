import {
	ShoppingListActionsEnum,
	ShoppingListActionsTypes,
} from "../actions/ShoppingListActions";

const initState = {
	listData: [] as Array<any>,
	loading: false,
	deleteId: "",
};

export type ShoppingListStateType = {
	listData: Array<any>;
	loading: boolean;
	deleteId: string;
};

const shoppingListReducer = (
	state = initState,
	action: ShoppingListActionsTypes
) => {
	switch (action.type) {
		case ShoppingListActionsEnum.SET_LIST:
			return { ...state, listData: action.lists };
		case ShoppingListActionsEnum.SET_LOADING:
			return { ...state, loading: action.loading };
		case ShoppingListActionsEnum.SET_DELETE_ID:
			return { ...state, deleteId: action.id };
		case ShoppingListActionsEnum.DELETE_LIST:
			const listData = state.listData;
			const deleteId = state.deleteId;

			if (!Array.isArray(listData)) {
				return state;
			}

			const list = listData.filter(item => {
				return item._id !== deleteId;
			});

			return { ...state, listData: list };
		default:
			return state;
	}
};

export default shoppingListReducer;
