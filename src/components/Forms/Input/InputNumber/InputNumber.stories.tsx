import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { InputNumber } from './InputNumber';

const meta = {
	title: 'Forms/Input/Number',
	component: InputNumber,
	parameters: {
		controls: {
			include: ['classname', 'value', 'placeholder', 'name'],
		},
		layout: 'centered',
		args: {
			className: '',
			value: '',
			name: '',
			placeholder: 'Введите число',
		},
	},
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Input');
		await expect(element).toBeInTheDocument();
	},
	args: {
		value: '',
		placeholder: 'Введите число',
	},
};
