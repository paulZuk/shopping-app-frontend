import { createSelector } from 'reselect';
import { IRootState } from 'reducer';
import { IProduct } from '../reducers/ProductReducer';

const getProductList = createSelector(
	(state: IRootState) => state.product.list.get('productList'),
	(state: IRootState) => state.product.loading.get('loading'),
	(productList, loading) => ({
		productList: productList as Array<IProduct>,
		loading,
	})
);

export default getProductList;
