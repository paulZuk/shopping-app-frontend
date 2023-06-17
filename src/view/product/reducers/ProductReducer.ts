import { combineReducers } from "redux";
import { ProductActionsEnum, Prefix } from "../actions/ProductActions";
import createLoadingReducer, {
	LoadingStateType,
} from "core/reducers/loadingReducer";

const initState = {
	productList: [],
};

export type ProductType = {
	id: string;
	type: string;
	name: string;
};

export type ProductStateType = {
	list: ProductListStateType;
	loading: LoadingStateType;
};

export type ProductListStateType = {
	productList: Array<ProductType | undefined>;
};

const loadingReducer = createLoadingReducer(Prefix.PRODUCT);
const productReducer = (state = initState, action: any) => {
	switch (action.type) {
		case ProductActionsEnum.SET_PRODUCT:
			return {
				...state,
				productList: action.productList.map((elem: ProductType) => ({
					...elem,
					checked: false,
					count: 1,
				})),
			};
		default:
			return state;
	}
};

export default combineReducers({
	list: productReducer,
	loading: loadingReducer,
});
