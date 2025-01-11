import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { InputTelegram } from './InputTelegram';

const meta = {
	title: 'Forms/Input/Telegram',
	component: InputTelegram,
	parameters: {
		controls: {
			include: ['value', 'classname', 'name'],
		},
		layout: 'centered',
		args: {
			className: '',
			value: '',
			name: '',
		},
	},
} satisfies Meta<typeof InputTelegram>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Input');
		await expect(element).toBeInTheDocument();
	},
};
