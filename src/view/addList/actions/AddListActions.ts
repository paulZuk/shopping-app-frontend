export enum AddListActions {
	ADD_LIST = 'ADD_LIST',
	EDIT_LIST = 'EDIT_LIST',
	LOAD_ADD_FORM = 'LOAD_ADD_FORM',
	LOAD_LIST_DATA = 'LOAD_LIST_DATA',
	SET_ADD_LIST_LOADING = 'SET_ADD_LIST_LOADING',
	SET_VALUE_ADD_LIST = 'SET_VALUE_ADD_LIST',
	RESET_ADD_LIST = 'RESET_ADD_LIST',
}

export enum Priority {
	High = 'HIGH',
	Low = 'LOW',
}

interface IAddListData {
	listName: string;
	priority: Priority;
	shared?: Array<{}>;
}

export interface ILoadListData {
	type: typeof AddListActions.LOAD_LIST_DATA;
	id: string;
}

export interface IAddList {
	type: typeof AddListActions.ADD_LIST;
	addListData: IAddListData;
}

export interface ISetValue {
	type: typeof AddListActions.SET_VALUE_ADD_LIST;
	field: string;
	value: any;
}

export interface IResetData {
	type: typeof AddListActions.RESET_ADD_LIST;
}
export interface ILoadForm {
	type: typeof AddListActions.LOAD_ADD_FORM;
	data: any;
}

export interface IEditList {
	type: typeof AddListActions.EDIT_LIST;
	id: string;
}

const loadForm = (data: any) => ({
	type: AddListActions.LOAD_ADD_FORM,
	data,
});

const setLoading = (loading: boolean) => ({
	type: AddListActions.SET_ADD_LIST_LOADING,
	loading,
});

const getListData = (id: string) => ({
	type: AddListActions.LOAD_LIST_DATA,
	id,
});

const addList = (addListData: IAddListData): IAddList => {
	return {
		type: AddListActions.ADD_LIST,
		addListData,
	};
};

const editList = (id: string) => ({
	type: AddListActions.EDIT_LIST,
	id,
});

const setValue = (field: string, value: any) => ({
	type: AddListActions.SET_VALUE_ADD_LIST,
	field,
	value,
});

const resetData = () => ({
	type: AddListActions.RESET_ADD_LIST,
});

export type AddListActionsTypes =
	| ILoadListData
	| IAddList
	| ISetValue
	| ILoadForm
	| IResetData
	| IEditList;

const addListActions = {
	addList,
	getListData,
	setLoading,
	setValue,
	resetData,
	loadForm,
	editList,
};

export default addListActions;
