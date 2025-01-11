import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Input } from './Input';

const meta = {
	title: 'Forms/Input/Base',
	component: Input,
	tags: ['autodocs'],
	parameters: {
		controls: {
			include: [
				'value',
				'classname',
				'type',
				'name',
				'placeholder',
				'testId',
				'width',
			],
		},
		layout: 'centered',
		args: {
			value: '',
			type: 'text',
			width: '358px',
		},
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	args: {
		type: 'text',
		placeholder: 'example',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Input');
		await expect(element).toBeInTheDocument();
	},
};

export const WithTooltipAndClear: Story = {
	args: {
		type: 'text',
		placeholder: 'example',
		tooltip: 'Some long tooltip text',
		isClearable: true,
	},
};
