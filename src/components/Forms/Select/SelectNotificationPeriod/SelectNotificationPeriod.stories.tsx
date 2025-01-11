import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { SelectNotificationPeriod } from './SelectNotificationPeriod';
import { useArgs } from '@storybook/preview-api';

const meta = {
	title: 'Forms/Select/SelectNotificationPeriod',
	component: SelectNotificationPeriod,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
		// viewport: {
		// 	defaultViewport: 'desktop',
		// },
	},
	decorators: [
		(Story) => {
			const [args, updateArgs] = useArgs();

			const onChange = (value: string) => {
				updateArgs({ currentValue: value });
			};

			return <Story args={{ ...args, onChange }} />;
		},
	],
	args: {
		currentValue: 'Monday',
	},
} satisfies Meta<typeof SelectNotificationPeriod>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	args: {
		currentValue: 'Monday',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('SelectNotificationPeriod');
		await expect(element).toBeInTheDocument();
	},
};
