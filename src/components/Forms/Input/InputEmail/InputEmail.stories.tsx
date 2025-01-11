import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { InputEmail } from './InputEmail';

const meta = {
	title: 'Forms/Input/Email',
	component: InputEmail,
	parameters: {
		controls: {
			include: ['value', 'classname', 'name'],
		},
		layout: 'centered',
		args: {
			value: '',
		},
	},
} satisfies Meta<typeof InputEmail>;

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
