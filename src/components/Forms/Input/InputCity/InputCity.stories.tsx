import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { InputCity } from './InputCity';

const meta = {
	title: 'Forms/Input/City',
	component: InputCity,
	parameters: {
		controls: {
			include: ['value', 'classname', 'name', 'placeholder'],
		},
		layout: 'centered',
		args: {
			className: '',
			value: '',
			name: '',
			placeholder: '',
		},
	},
} satisfies Meta<typeof InputCity>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	args: {
		placeholder: 'Город',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Input');
		await expect(element).toBeInTheDocument();
	},
};
