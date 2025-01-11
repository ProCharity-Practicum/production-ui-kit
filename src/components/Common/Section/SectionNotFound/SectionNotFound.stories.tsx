import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { SectionNotFound } from './SectionNotFound';

const meta = {
	title: 'Common/Layout/Section/NotFound',
	component: SectionNotFound,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
		// viewport: {
		// 	defaultViewport: 'desktop',
		// },
	},
} satisfies Meta<typeof SectionNotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Section');
		await expect(element).toBeInTheDocument();
	},
};
