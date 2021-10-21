export interface ILoadingAction {
	type: string;
	loading: boolean;
}

export const createLoadingActions = (prefix: string) => (
	loading: boolean
): ILoadingAction => ({
	type: `${prefix}_LOADING`,
	loading,
});

export default createLoadingActions;
