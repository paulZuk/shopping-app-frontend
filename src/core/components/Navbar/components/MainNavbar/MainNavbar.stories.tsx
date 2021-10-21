import { ComponentStory, ComponentMeta } from '@storybook/react';
import MaterialUiProvider from 'core/MaterialUIProvider';

import MainNavbar from './MainNavbar';

export default {
	title: 'Components/Navbar',
	component: MainNavbar,
	parameters: {
		backgrounds: {
			default: 'blue',
			values: [{ name: 'blue', value: '#00aced' }],
		},
	},
	decorators: [
		Story => (
			<MaterialUiProvider>
				<Story />
			</MaterialUiProvider>
		),
	],
} as ComponentMeta<typeof MainNavbar>;

const Template: ComponentStory<typeof MainNavbar> = args => <MainNavbar />;

export const Main = Template.bind({});
