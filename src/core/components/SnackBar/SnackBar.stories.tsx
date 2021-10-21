import { ComponentStory, ComponentMeta } from '@storybook/react';

import SnackBar from './SnackBar';
import StoreProvider from 'core/StoreProvider';
import MaterialUiProvider from 'core/MaterialUIProvider';

export default {
	title: 'Components/SnackBar',
	component: SnackBar,
	decorators: [
		Story => (
			<StoreProvider>
				<MaterialUiProvider>
					<Story />
				</MaterialUiProvider>
			</StoreProvider>
		),
	],
} as ComponentMeta<typeof SnackBar>;

const Template: ComponentStory<typeof SnackBar> = args => (
	<SnackBar {...args} />
);

export const Info = Template.bind({});

const snackBarStandardProps = {
	open: true,
	setVisible: (type: boolean) => ({ type: 'type', payload: type }),
};

Info.args = {
	...snackBarStandardProps,
	type: 'info',
	message: 'Info',
};

export const Success = Template.bind({});

Success.args = {
	...snackBarStandardProps,
	type: 'success',
	message: 'Success',
};

export const Warning = Template.bind({});

Warning.args = {
	...snackBarStandardProps,
	type: 'warning',
	message: 'Warning',
};

export const Error = Template.bind({});

Error.args = {
	...snackBarStandardProps,
	type: 'error',
	message: 'Error',
};
