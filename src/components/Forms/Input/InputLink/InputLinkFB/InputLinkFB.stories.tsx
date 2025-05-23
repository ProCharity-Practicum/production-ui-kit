import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { InputLinkFb } from '@/components/Forms/Input/InputLink/InputLinkFB/InputLinkFB.tsx';

const meta = {
	title: 'Forms/Input/Link/FB',
	component: InputLinkFb,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
		// viewport: {
		// 	defaultViewport: 'desktop',
		// },
	},
} satisfies Meta<typeof InputLinkFb>;

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
