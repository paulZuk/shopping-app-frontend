export type LoadingActionType = {
	type: string;
	loading: boolean;
}

export const createLoadingActions = (prefix: string) => (
	loading: boolean
): LoadingActionType => ({
	type: `${prefix}_LOADING`,
	loading,
});

export default createLoadingActions;
