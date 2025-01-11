import { UserMenu } from './UserMenu';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

const meta: Meta<typeof UserMenu> = {
	title: 'Common/Navigation/UserMenu',
	component: UserMenu,
	parameters: {
		layout: 'centered',
	},
	args: {},
} as Meta;

export default meta;
type Story = StoryObj<typeof UserMenu>;

export const Default: Story = {
	args: {
		title: 'Список',
		items: [
			{ label: 'Home', href: '#' },
			{ label: 'About', href: '#' },
			{ label: 'Contact', href: '#' },
		],
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('UserMenu');
		await expect(element).toBeInTheDocument();
	},
};
