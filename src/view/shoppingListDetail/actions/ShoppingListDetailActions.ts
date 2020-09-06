export enum ShoppingListDetailActions {
	DETAIL_TOGGLE_CHECKED = 'DETAIL_TOGGLE_CHECKED',
}

const toggleDetailChecked = (id: string) => ({
	type: ShoppingListDetailActions.DETAIL_TOGGLE_CHECKED,
	id,
});

export default {
	toggleDetailChecked,
};
