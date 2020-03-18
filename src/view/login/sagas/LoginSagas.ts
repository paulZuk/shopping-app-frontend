import { call, put, fork, takeEvery } from 'redux-saga/effects';

export function* tryLogin(action: ILoadDataAction) {
	const { key, endpointServiceFn, args } = action;
	try {
		yield put(setResponseAction(key, new ApiResponse()));
		const response = yield call(endpointServiceFn, ...args);
		yield put(setResponseAction(key, new ApiResponse(response)));
	} catch (e) {
		yield put(
			setResponseAction(key, new ApiResponse(e.response ? e.response : e))
		);
	}
}

export function* watchLoadData() {
	yield takeEvery(Actions.Data_LoadData, loadData);
}

export default function* rootData() {
	yield fork(watchLoadData);
}
