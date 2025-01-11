import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Toggle } from './Toggle';

const meta = {
	title: 'Forms/Toggle/Default',
	component: Toggle,
	parameters: {
		layout: 'centered',
	},
	args: {
		checked: false,
		text: 'Только онлайн-задачи',
	},
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToggleNotChecked: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Toggle');
		await expect(element).toBeInTheDocument();
	},
};

export const ToggleChecked: Story = {
	args: {
		checked: true,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Toggle');
		await expect(element).toBeInTheDocument();
	},
};
