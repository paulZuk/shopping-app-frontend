import Immutable from 'immutable';
import { ShoppingListDetailActions } from '../actions/ShoppingListDetailActions';

const initState = Immutable.Map({
	detailData: [
		{ id: 'sdfsdf', type: 'Nabiał', checked: false, name: 'Mleko' },
		{ id: 'etbe', type: 'Pieczywo', checked: false, name: 'Bułki' },
		{
			id: 'fsdmow',
			type: 'Nabiał',
			checked: true,
			name: 'Jogurt naturalny',
		},
		{ id: 'vswri', type: 'Kuchnia', checked: false, name: 'Domestos' },
		{
			id: 'sffsf',
			type: 'Art. spozywcze',
			checked: false,
			name: 'Woda mineralna',
		},
		{ id: 'fssfss', type: 'Pieczywo', checked: true, name: 'Chleb' },
	],
});

export interface IDetail {
	id: string;
	type: string;
	checked: boolean;
	name: string;
}

export interface IShoppingListDetailtState extends Immutable.Map<string, any> {
	detailData: Array<any>;
}

const shoppingListDetailReducer = (state = initState, action: any) => {
	switch (action.type) {
		case ShoppingListDetailActions.DETAIL_TOGGLE_CHECKED:
			const data = state.get('detailData') || [];
			const newData = data?.map(data => {
				if (data.id === action.id) {
					return {
						...data,
						checked: !data.checked,
					};
				}
				return data;
			});
			return state.set('detailData', newData);
		default:
			return state;
	}
};

export default shoppingListDetailReducer;
