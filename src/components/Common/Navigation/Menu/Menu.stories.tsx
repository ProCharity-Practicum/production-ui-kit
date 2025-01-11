import { Menu } from './Menu';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

const meta: Meta<typeof Menu> = {
	title: 'Common/Navigation/Menu',
	component: Menu,
	parameters: {
		layout: 'centered',
	},
	args: {},
} as Meta;

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
	args: {
		items: [
			{ label: 'Home', href: '/' },
			{ label: 'About', href: '/about' },
			{ label: 'Contact', href: '/contact' },
		],
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Menu');
		await expect(element).toBeInTheDocument();
	},
};
