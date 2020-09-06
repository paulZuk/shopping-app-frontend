import Immutable from 'immutable';
import {
	AddListActions,
	AddListActionsTypes,
	Priority,
} from '../actions/AddListActions';

const initState = Immutable.Map({
	data: Immutable.Map({
		listName: '',
		priority: Priority.Low,
		sharedChecked: false,
		sharedInput: [],
	}),
});

export interface IAddList extends Immutable.Map<string, any> {
	data: Immutable.Map<string, any>;
}

const addListReducer = (state = initState, action: AddListActionsTypes) => {
	switch (action.type) {
		case AddListActions.SET_VALUE_ADD_LIST:
			return state.setIn(['data', action.field], action.value);
		case AddListActions.LOAD_ADD_FORM:
			const { listName, priority, shared } = action.data;

			return state.set(
				'data',
				Immutable.Map({
					listName,
					priority,
					sharedInput: shared,
					sharedChecked: shared && !!shared.length,
				})
			);
		case AddListActions.RESET_ADD_LIST:
			return state.merge(initState);
		default:
			return state;
	}
};

export default addListReducer;
