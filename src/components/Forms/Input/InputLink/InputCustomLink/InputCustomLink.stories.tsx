import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { InputCustomLink } from './InputCustomLink';

const meta = {
	title: 'Forms/Input/Link/Custom',
	component: InputCustomLink,
	parameters: {
		controls: {
			include: ['className', 'value'],
		},
		layout: 'centered',
		args: {},
		argTypes: {
			value: {
				control: 'object',
			},
			className: {
				control: 'text',
			},
		},
	},
} satisfies Meta<typeof InputCustomLink>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('InputCustomLink');
		await expect(element).toBeInTheDocument();
	},
	args: {
		value: {
			name: 'My google account',
			link: 'google.com',
		},
	},
};
