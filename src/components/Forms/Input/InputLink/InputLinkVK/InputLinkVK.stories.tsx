import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { InputLinkVk } from '@/components/Forms/Input/InputLink/InputLinkVK/InputLinkVK.tsx';

const meta = {
	title: 'Forms/Input/Link/VK',
	component: InputLinkVk,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
		// viewport: {
		// 	defaultViewport: 'desktop',
		// },
	},
} satisfies Meta<typeof InputLinkVk>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Input');
		await expect(element).toBeInTheDocument();
	},
};
