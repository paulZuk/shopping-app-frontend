export enum ShoppingListActionsEnum {
	GET_LIST = 'GET_LIST',
	SET_LIST = 'SET_LIST',
}

export interface IShared {
	id: string;
	name: string;
}

export interface IShoppingList {
	listName: string;
	priority: string;
	shared: Array<IShared>;
}

export interface IGetShoppingList {
	type: typeof ShoppingListActionsEnum.GET_LIST;
}

export interface ISetShoppingList {
	type: typeof ShoppingListActionsEnum.SET_LIST;
	lists: Array<any>;
}

const getLists = () => ({
	type: ShoppingListActionsEnum.GET_LIST,
});

const setLists = (lists: Array<any>) => ({
	type: ShoppingListActionsEnum.SET_LIST,
	lists,
});

export type ShoppingListActionsTypes = IGetShoppingList | ISetShoppingList;

export default {
	getLists,
	setLists,
};
