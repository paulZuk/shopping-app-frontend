import { Map } from 'immutable';
import { combineReducers } from 'redux';
import { ProductActionsEnum, Prefix } from '../actions/ProductActions';
import createLoadingReducer, {
	LoadingStateType,
} from 'core/reducers/loadingReducer';

const initState = Map({
	productList: [],
});

export type ProductType = {
	id: string;
	type: string;
	name: string;
}

export type ProductStateType = Map<string, any> & {
	list: ProductListStateType;
	loading: LoadingStateType;
}

export type ProductListStateType = Map<string, any> & {
	productList: Array<ProductType | undefined>;
}

const loadingReducer = createLoadingReducer(Prefix.PRODUCT);
const productReducer = (state = initState, action: any) => {
	switch (action.type) {
		case ProductActionsEnum.SET_PRODUCT:
			return state.set(
				'productList',
				action.productList.map((elem: ProductType) => ({
					...elem,
					checked: false,
				}))
			);
		default:
			return state;
	}
};

export default combineReducers({
	list: productReducer,
	loading: loadingReducer,
});
