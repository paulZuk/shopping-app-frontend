import { Map } from "immutable";
import { ShoppingListDetailEnum } from "../actions/ShoppingListDetailActions";

const initState = Map({
	detailData: [] as Array<DetailType>,
});

export type DetailType = {
	_id: string;
	type: string;
	checked: boolean;
	count: number;
	name: string;
};

export type ShoppingListDetailStateType = Map<string, DetailType[]> & {
	detailData: DetailType[];
};

const shoppingListDetailReducer = (state = initState, action: any) => {
	switch (action.type) {
		case ShoppingListDetailEnum.DETAIL_TOGGLE_CHECKED:
			const data = state.get("detailData") || [];
			const newData = data?.map(data => {
				if (data._id === action.id) {
					return {
						...data,
						checked: !data.checked,
					};
				}
				return data;
			});
			return state.set("detailData", newData);
		case ShoppingListDetailEnum.SET_LOADING:
			return state.set("loading", action.loading);
		case ShoppingListDetailEnum.ADD_TO_LIST:
			const detailData = state.get("detailData");
			const duplicatedProductIdx = detailData?.findIndex(
				data => data._id === action.item._id
			);

			if (duplicatedProductIdx !== -1 && detailData) {
				return state.set(
					"detailData",
					detailData.map((detail, idx) =>
						idx === duplicatedProductIdx
							? { ...detail, count: detail.count + 1 }
							: detail
					)
				);
			}

			const newState = [
				...(state.get("detailData") as any[]),
				action.item,
			];

			return state.set(
				"detailData",
				newState.filter((item, pos) => newState.indexOf(item) === pos)
			);
		case ShoppingListDetailEnum.REMOVE_FROM_LIST:
			const detail = state
				.get("detailData")
				?.find(elem => elem._id === action.id);

			if (detail && detail?.count > 1) {
				return state.set("detailData", [
					...state.get("detailData"),
					detail,
				]);
			}

			const filteredArray =
				state
					.get("detailData")
					?.filter(elem => elem._id !== action.id) || [];

			console.log(state.get("detailData"));
			return state.set("detailData", filteredArray);
		case ShoppingListDetailEnum.SET_DETAIL_DATA:
			return state.set("detailData", action.data);
		default:
			return state;
	}
};

export default shoppingListDetailReducer;
