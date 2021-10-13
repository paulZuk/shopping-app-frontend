import Immutable from 'immutable';
import { combineReducers } from 'redux';
import { ProductActionsEnum, Prefix } from '../actions/ProductActions';
import createLoadingReducer, {
	ILoadingState,
} from 'core/reducers/loadingReducer';

const initState = Immutable.Map({
	productList: [],
});

export interface IProduct {
	id: string;
	type: string;
	name: string;
}

export interface IProductState extends Immutable.Map<string, any> {
	list: IProductListState;
	loading: ILoadingState;
}

interface IProductListState extends Immutable.Map<string, any> {
	productList: Array<IProduct | undefined>;
}

const loadingReducer = createLoadingReducer(Prefix.PRODUCT);
const productReducer = (state = initState, action: any) => {
	switch (action.type) {
		case ProductActionsEnum.SET_PRODUCT:
			return state.set(
				'productList',
				action.productList.map((elem: IProduct) => ({
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
