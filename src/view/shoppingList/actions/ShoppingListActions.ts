export enum ShoppingListActionsEnum {
	GET_LIST = 'GET_LIST',
	SET_LIST = 'SET_LIST',
	DELETE_LIST = 'DELETE_LIST',
	LOAD_LIST_DATA = 'LOAD_LIST_DATA',
	SET_LOADING = 'SET_LOADING',
	SET_DELETE_ID = 'SET_DELETE_ID',
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

export interface ISetLoading {
	type: typeof ShoppingListActionsEnum.SET_LOADING;
	loading: boolean;
}

export interface IDeleteList {
	type: typeof ShoppingListActionsEnum.DELETE_LIST;
}

export interface IDeleteId {
	type: typeof ShoppingListActionsEnum.SET_DELETE_ID;
	id: string;
}

const getLists = () => ({
	type: ShoppingListActionsEnum.GET_LIST,
});

const deleteList = () => ({
	type: ShoppingListActionsEnum.DELETE_LIST,
});

const setLists = (lists: Array<any>) => ({
	type: ShoppingListActionsEnum.SET_LIST,
	lists,
});

const setLoading = (loading: boolean) => ({
	type: ShoppingListActionsEnum.SET_LOADING,
	loading,
});

const setDeleteId = (id: string) => ({
	type: ShoppingListActionsEnum.SET_DELETE_ID,
	id,
});

export type ShoppingListActionsTypes =
	| IGetShoppingList
	| ISetShoppingList
	| IDeleteList
	| IDeleteId
	| ISetLoading;

export default {
	getLists,
	deleteList,
	setLists,
	setLoading,
	setDeleteId,
};
