export enum AddListActions {
	ADD_LIST = 'ADD_LIST',
}

export enum Priority {
	High = 'HIGH',
	Mid = 'MID',
	Low = 'LOW',
}

interface IAddListData {
	listName: string;
	priority: Priority;
	shared?: Array<{}>;
}

export interface IAddList {
	type: typeof AddListActions.ADD_LIST;
	addListData: IAddListData;
}

const addList = (addListData: IAddListData): IAddList => {
	return {
		type: AddListActions.ADD_LIST,
		addListData,
	};
};

export default {
	addList,
};
