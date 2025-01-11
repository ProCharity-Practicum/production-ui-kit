import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { InputLink } from './InputLink';

const meta = {
	title: 'Forms/Input/Link',
	component: InputLink,
	parameters: {
		controls: {
			include: [
				'classname',
				'value',
				'errorMessage',
				'label',
				'placeholder',
				'type',
			],
		},
		layout: 'centered',
		args: {
			className: '',
			value: '',
			errorMessage: '',
			name: '',
			type: '',
		},
	},
} satisfies Meta<typeof InputLink>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Input');
		await expect(element).toBeInTheDocument();
	},
	args: {},
};
