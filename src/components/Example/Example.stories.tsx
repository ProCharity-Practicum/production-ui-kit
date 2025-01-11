import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { Example } from './Example';

const meta = {
	title: 'Demo/Example',
	component: Example,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'fullscreen',
		viewport: {
			defaultViewport: 'tablet',
		},
	},
} satisfies Meta<typeof Example>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const WithInitialValueChanges: Story = {
	args: {
		initialValue: 0,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const counterButton = canvas.getByRole('button', { name: /count/i });
		await expect(counterButton).toBeInTheDocument();

		if (counterButton && counterButton.textContent) {
			// Static args
			// const { initialValue } = WithInitialValueChanges.args as ExampleProps;

			// Dynamic args
			const initialValue = +counterButton.textContent.split(' ').pop()!;

			for (let i = initialValue + 1; i <= initialValue + 3; i++) {
				await userEvent.click(counterButton);
				await expect(counterButton).toHaveTextContent(`count is ${i}`);
			}
		}
	},
};
