import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { expect, fn, within } from '@storybook/test';

const meta = {
	title: 'Common/Navigation/Tabs',
	component: Tabs,
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
	args: {
		value: 0,
		options: ['Компании', 'Волонтеры', 'НКО'],
		onChange: fn(),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Tabs');
		await expect(element).toBeInTheDocument();
	},
};
