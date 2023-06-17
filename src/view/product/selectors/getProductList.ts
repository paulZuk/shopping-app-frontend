import { createSelector } from "reselect";
import { IRootState } from "reducer";
import { ProductType } from "../reducers/ProductReducer";

const getProductList = createSelector(
	(state: IRootState) => state.product.list.productList,
	(state: IRootState) => state.product.loading.loading,
	(productList, loading) => ({
		productList: productList as Array<ProductType>,
		loading,
	})
);

export default getProductList;
