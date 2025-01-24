import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Image } from './Image';

const meta = {
	title: 'New/Image',
	component: Image,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
		// viewport: {
		// 	defaultViewport: 'desktop',
		// },
	},
	args: {
		src: 'https://placehold.co/350x150',
		alt: 'demo.welcomeUser',
	},
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Image');
		await expect(element).toBeInTheDocument();
	},
};
