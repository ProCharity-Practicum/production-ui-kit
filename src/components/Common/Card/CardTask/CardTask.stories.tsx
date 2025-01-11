import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CardTask } from './CardTask';
import { TagColor } from '@/components/Common/Tag/types.ts';
import { ButtonOutline } from '@/components/Common/Button';

const meta: Meta<typeof CardTask> = {
	title: 'Common/Content/Card/Task/CardTask',
	component: CardTask,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {
		data: {
			name: 'Task name',
			category: 'Category',
			views: 1,
			profit: 1,
			responses: 2,
			comments: 0,
			dueDate: '20 декабря 2025',
			location: 'Удаленно',
			tags: ['Актуально', { value: 'COVID-19', color: TagColor.Secondary }],
		},
	},
	decorators: [
		(Story) => (
			<div style={{ minWidth: '360px', height: '496px' }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof CardTask>;

export const Default: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Card');
		await expect(element).toBeInTheDocument();
	},
};

export const ForVolunteer: Story = {
	args: {
		data: { ...meta.args!.data!, responses: undefined, profit: 0 },
		actions: <ButtonOutline>Отказаться</ButtonOutline>,
	},
};
