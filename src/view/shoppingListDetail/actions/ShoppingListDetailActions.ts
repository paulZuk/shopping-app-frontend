export enum ShoppingListDetailEnum {
	DETAIL_TOGGLE_CHECKED = 'DETAIL_TOGGLE_CHECKED',
	SET_LOADING = 'SET_LOADING',
	ADD_TO_LIST = 'ADD_TO_LIST',
	REMOVE_FROM_LIST = 'REMOVE_FROM_LIST',
	SET_DETAIL_DATA = 'SET_DETAIL_DATA',
}

const toggleDetailChecked = (id: string) => ({
	type: ShoppingListDetailEnum.DETAIL_TOGGLE_CHECKED,
	id,
});
const setLoading = (loading: boolean) => ({
	type: ShoppingListDetailEnum.SET_LOADING,
	loading,
});

const setDetailData = (data: any) => ({
	type: ShoppingListDetailEnum.SET_DETAIL_DATA,
	data,
});

const addToList = (item: any) => ({
	type: ShoppingListDetailEnum.ADD_TO_LIST,
	item,
});

const removeFromList = (id: string) => ({
	type: ShoppingListDetailEnum.REMOVE_FROM_LIST,
	id,
});

const shoppingListDetailActions = {
	toggleDetailChecked,
	setLoading,
	addToList,
	removeFromList,
	setDetailData,
};

export default shoppingListDetailActions;
