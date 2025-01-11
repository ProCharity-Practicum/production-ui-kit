import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { InputText } from './InputText';

const meta = {
	title: 'Forms/Input/Text',
	component: InputText,
	tags: ['autodocs'],
	parameters: {
		controls: {
			include: [
				'value',
				'classname',
				'name',
				'width',
				'placeholder',
				'maxLength',
			],
		},
		layout: 'centered',
		args: {
			className: '',
			value: '',
			name: '',
			placeholder: '',
			maxLength: '',
			width: '',
		},
	},
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('InputText');
		await expect(element).toBeInTheDocument();
	},
};

export const WithLimit: Story = {
	args: {
		maxLength: 50,
		width: '300px',
		placeholder: 'Введите текст',
	},
};
