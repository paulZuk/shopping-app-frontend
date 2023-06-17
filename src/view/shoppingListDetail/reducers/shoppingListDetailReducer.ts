import { ShoppingListDetailEnum } from "../actions/ShoppingListDetailActions";

const initState = {
	detailData: [] as Array<DetailType>,
};

export type DetailType = {
	_id: string;
	type: string;
	checked: boolean;
	count: number;
	name: string;
};

export type ShoppingListDetailStateType = {
	detailData: DetailType[];
};

const shoppingListDetailReducer = (state = initState, action: any) => {
	switch (action.type) {
		case ShoppingListDetailEnum.DETAIL_TOGGLE_CHECKED:
			const data = state.detailData || [];
			const newData = data?.map(data => {
				if (data._id === action.id) {
					return {
						...data,
						checked: !data.checked,
					};
				}
				return data;
			});

			return { ...state, detailData: newData };
		case ShoppingListDetailEnum.SET_LOADING:
			return { ...state, loading: action.loading };
		case ShoppingListDetailEnum.ADD_TO_LIST:
			const detailData = state.detailData;
			const duplicatedProductIdx = detailData?.findIndex(
				data => data._id === action.item._id
			);

			if (duplicatedProductIdx !== -1 && detailData) {
				return {
					...state,
					detailData: detailData.map((detail, idx) =>
						idx === duplicatedProductIdx
							? { ...detail, count: detail.count + 1 }
							: detail
					),
				};
			}

			const newState = [...state.detailData, action.item];

			return {
				...state,
				detailData: newState.filter(
					(item, pos) => newState.indexOf(item) === pos
				),
			};
		case ShoppingListDetailEnum.REMOVE_FROM_LIST:
			const detail = state.detailData?.find(
				elem => elem._id === action.id
			);

			if (detail && detail?.count > 1) {
				return { ...state, detailData: [...state.detailData, detail] };
			}

			const filteredArray =
				state.detailData?.filter(elem => elem._id !== action.id) || [];

			return { ...state, detailData: filteredArray };
		case ShoppingListDetailEnum.SET_DETAIL_DATA:
			return { ...state, detailData: action.data };
		default:
			return state;
	}
};

export default shoppingListDetailReducer;
