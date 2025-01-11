import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { InputDate } from './InputDate';
import { useArgs } from '@storybook/preview-api';
import { ChangeEvent } from 'react';

const meta = {
	title: 'Forms/Input/Date',
	component: InputDate,
	decorators: [
		(Story) => {
			const [args, updateArgs] = useArgs();

			function onChange(value: ChangeEvent<HTMLInputElement>) {
				updateArgs(value);
			}

			return <Story args={{ ...args, onChange }} />;
		},
	],
	parameters: {
		controls: {
			include: ['value', 'classname', 'name'],
		},
		layout: 'centered',
		args: {
			className: '',
		},
	},
	args: {},
} satisfies Meta<typeof InputDate>;

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
