import {
	AddListActions,
	AddListActionsTypes,
	Priority,
} from "../actions/AddListActions";

const initState = {
	data: {
		listName: "",
		priority: Priority.Low,
		sharedChecked: false,
		sharedInput: [],
	},
};

export type AddListStateType = {
	data: Record<string, any>;
};

const addListReducer = (state = initState, action: AddListActionsTypes) => {
	switch (action.type) {
		case AddListActions.SET_VALUE_ADD_LIST:
			return {
				...state,
				data: { ...state.data, [action.field]: action.value },
			};
		case AddListActions.LOAD_ADD_FORM:
			const { listName, priority, shared } = action.data;

			return {
				...state,
				data: {
					listName,
					priority,
					sharedInput: shared,
					sharedChecked: shared && !!shared.length,
				},
			};

		case AddListActions.RESET_ADD_LIST:
			return Object.assign({}, state, initState);
		default:
			return state;
	}
};

export default addListReducer;
