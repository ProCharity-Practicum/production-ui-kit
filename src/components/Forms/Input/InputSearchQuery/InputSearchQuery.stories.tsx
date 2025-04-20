import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { InputSearchQuery } from './InputSearchQuery';

const meta = {
	title: 'Forms/Input/SearchQuery',
	component: InputSearchQuery,
	parameters: {
		controls: {
			include: ['classname', 'placeholder', 'name'],
		},
		layout: 'centered',
		args: {
			className: '',
			placeholder: '',
			name: '',
		},
	},
	decorators: [
		(Story) => (
			<div
				style={{ width: '700px', border: '1px dashed #ccc', padding: '20px' }}
			>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof InputSearchQuery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: 'Поиск по ключевым словам',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Input');
		await expect(element).toBeInTheDocument();
	},
};
