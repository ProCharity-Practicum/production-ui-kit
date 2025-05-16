import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CardTask, TaskShortData } from './CardTask';
import { TagColor } from '@/components/Common/Tag/types.ts';
import { ButtonOutline } from '@/components/Common/Button';

const defaultData: TaskShortData = {
	name: 'Task name',
	category: 'Category',
	views: 1,
	profit: 1,
	responses: 2,
	comments: 0,
	dueDate: '20 декабря 2025',
	location: 'Удаленно',
	tags: ['Актуально', { value: 'COVID-19', color: TagColor.Secondary }],
};

const meta: Meta<typeof CardTask> = {
	title: 'Common/Content/Card/Task/CardTask',
	component: CardTask,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {
		data: defaultData,
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

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ForVolunteer: Story = {
	...Default,
	args: {
		data: { ...defaultData, responses: undefined, profit: 0 },
		actions: <ButtonOutline>Отказаться</ButtonOutline>,
	},
};

export const WithStateChanged: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Card');
		await expect(element).toBeInTheDocument();
	},
};
