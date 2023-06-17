import axios from "axios";
import { call, fork, takeEvery, put } from "redux-saga/effects";
import { push } from "connected-react-router";
import ServerErrorActions from "core/serverError/actions/ServerErrorActions";
import ProductActions, {
	ProductActionsEnum,
} from "view/product/actions/ProductActions";

type commonRequestType = (...args: any[]) => any;

export const getProductRequest: commonRequestType = () => {
	return axios({
		method: "get",
		url: `${process.env.REACT_APP_ORIGIN}:8080/product`,
		withCredentials: true,
	});
};

export function* getProductList() {
	try {
		yield put(ProductActions.setLoading(true));
		const response: {
			status: number;
			data: { productList: any[] };
		} = yield call(getProductRequest);

		if (response.status === 200) {
			yield put(ProductActions.setProductList(response.data.productList));
		}

		yield put(ProductActions.setLoading(false));
	} catch (err) {
		const errors = err.response.data.errors;

		yield put(ProductActions.setLoading(false));

		if (err.response.status === 401) {
			yield put(push("/"));
		}

		yield put(ServerErrorActions.setError(errors));
		yield put(ServerErrorActions.toggleError(true));
	}
}

export function* watchAddList() {
	yield takeEvery(ProductActionsEnum.GET_PRODUCT, getProductList);
}

export default function* rootData() {
	yield fork(watchAddList);
}
