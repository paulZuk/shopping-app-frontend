import createLoadingActions from 'core/actions/createLoadingActions';

export enum ProductActionsEnum {
	GET_PRODUCT = 'GET_PRODUCT',
	SET_PRODUCT = 'SET_PRODUCT',
}

export enum Prefix {
	PRODUCT = 'PRODUCT',
}

const getProduct = () => ({
	type: ProductActionsEnum.GET_PRODUCT,
});

const setProductList = (productList: Array<any>) => ({
	type: ProductActionsEnum.SET_PRODUCT,
	productList,
});

const setLoading = createLoadingActions(Prefix.PRODUCT);

const productActions = {
	getProduct,
	setProductList,
	setLoading,
};

export default productActions;
