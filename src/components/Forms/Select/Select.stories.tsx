import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Select } from './Select';

const meta = {
	title: 'Forms/Select',
	component: Select,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
		// viewport: {
		// 	defaultViewport: 'desktop',
		// },
	},
	args: {
		options: ['chocolate', 'strawberry', 'vanilla'],
		label: 'Выберите',
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Select');
		await expect(element).toBeInTheDocument();
	},
};

export const HasValue: Story = {
	args: {
		currentValue: 'chocolate',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Select');
		await expect(element).toBeInTheDocument();
	},
};
