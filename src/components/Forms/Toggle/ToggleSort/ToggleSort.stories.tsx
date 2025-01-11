import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { ToggleSort } from './ToggleSort';

const meta = {
	title: 'forms/Toggle/ToggleSort',
	component: ToggleSort,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
		// viewport: {
		// 	defaultViewport: 'desktop',
		// },
	},
	args: {
		title: 'Дата регистрации',
	},
} satisfies Meta<typeof ToggleSort>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const DefaultToggleSort: Story = {
	args: {
		title: 'Дате регистрации',
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('ToggleSort');
		await expect(element).toBeInTheDocument();
	},
};
