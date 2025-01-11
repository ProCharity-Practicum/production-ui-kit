import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Avatar } from './Avatar';

import avatarExample from '/examples/volunteer_avatar.png?url';

const meta = {
	title: 'Common/Content/User/Avatar',
	component: Avatar,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
		// viewport: {
		// 	defaultViewport: 'desktop',
		// },
	},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	args: {
		image: 'https://example.com/unknown.png',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Avatar');
		await expect(element).toBeInTheDocument();
	},
};

export const WithImage: Story = {
	args: {
		image: avatarExample,
	},
};
