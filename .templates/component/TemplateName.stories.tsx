import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { TemplateName } from './TemplateName';

const meta = {
	title: 'New/TemplateName',
	component: TemplateName,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
		// viewport: {
		// 	defaultViewport: 'desktop',
		// },
	},
} satisfies Meta<typeof TemplateName>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const WithStateChanged: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('TemplateName');
		await expect(element).toBeInTheDocument();
	},
};
