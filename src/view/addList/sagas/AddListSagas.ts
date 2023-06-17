import axios from "axios";
import { push } from "connected-react-router";
import { call, fork, takeEvery, put, select } from "redux-saga/effects";
import ServerErrorActions from "core/serverError/actions/ServerErrorActions";
import AddListActions, {
	AddListType,
	AddListActions as AddListActionsEnum,
	LoadAddListDataType,
	EditListType,
} from "../actions/AddListActions";
import { getShoppingListRequest } from "view/shoppingList/sagas/ShoppingListSagas";
import getFormData from "../selectors/getFormData";

type addListRequestType = (...args: any[]) => any;

const addListRequest: addListRequestType = addListData => {
	const { listName, priority, shared, id } = addListData;
	const type = id ? "put" : "post";

	const commonData = {
		listName,
		priority,
		shared,
	};

	const requestData = id ? { ...commonData, id } : commonData;

	return axios({
		method: type,
		url: `${process.env.REACT_APP_ORIGIN}:8080/list`,
		data: requestData,
		withCredentials: true,
	});
};

export function* addList(action: AddListType) {
	const data = action.addListData;
	try {
		const response: { status: number } = yield call(addListRequest, {
			...data,
		});

		if (response.status === 200) {
			yield put(push("/list"));
		}
	} catch (err) {
		const errors = err.response.data.errors;

		if (err.response.status === 422) {
			yield put(ServerErrorActions.setError(errors));
			yield put(ServerErrorActions.toggleError(true));
		}
	}
}

export function* editList(action: EditListType) {
	const id = action.id;
	const { listName, priority, sharedInput: shared } = yield select(
		getFormData
	);

	const response: { status: number } = yield call(addListRequest, {
		id,
		listName,
		priority,
		shared,
	});

	if (response.status === 200) {
		yield put(push("/list"));
	}

	try {
	} catch (err) {
		const errors = err.response.data.errors;

		if (err.response.status === 422) {
			yield put(ServerErrorActions.setError(errors));
			yield put(ServerErrorActions.toggleError(true));
		}
	}
}

export function* loadListData(action: LoadAddListDataType) {
	const id = action.id;
	try {
		yield put(AddListActions.setLoading(true));
		const response: { status: number; data: number[] } = yield call(
			getShoppingListRequest,
			id
		);

		if (response.status === 200) {
			yield put(AddListActions.loadForm(response.data[0]));
		}

		yield put(AddListActions.setLoading(false));
	} catch (err) {
		const errors = err.response.data.errors;
		yield put(AddListActions.setLoading(false));
		if (err.response.status === 401) {
			yield put(push("/"));
		}
		yield put(ServerErrorActions.setError(errors));
		yield put(ServerErrorActions.toggleError(true));
	}
}

export function* watchAddList() {
	yield takeEvery(AddListActionsEnum.ADD_LIST, addList);
}

export function* watchLoadListData() {
	yield takeEvery(AddListActionsEnum.LOAD_LIST_DATA, loadListData);
}

export function* watchEditList() {
	yield takeEvery(AddListActionsEnum.EDIT_LIST, editList);
}

export default function* rootData() {
	yield fork(watchAddList);
	yield fork(watchLoadListData);
	yield fork(watchEditList);
}
