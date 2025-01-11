import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { InputPassword } from './InputPassword';

const meta = {
	title: 'Forms/Input/Password',
	component: InputPassword,
	parameters: {
		controls: {
			include: ['value', 'classname', 'name'],
		},
		layout: 'centered',
		viewport: {
			defaultViewport: 'desktop',
		},
		args: {
			className: '',
			value: '',
			name: '',
		},
	},
} satisfies Meta<typeof InputPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	args: {
		placeholder: 'Пароль',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Input');
		await expect(element).toBeInTheDocument();
	},
};
