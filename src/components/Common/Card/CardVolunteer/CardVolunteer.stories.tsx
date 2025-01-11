import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CardVolunteer } from './CardVolunteer';

const meta = {
	title: 'Common/Content/Card/Volunteer/Select',
	component: CardVolunteer,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
		// viewport: {
		// 	defaultViewport: 'desktop',
		// },
	},
	args: {
		user: {
			name: 'Имя Фамилия',
			grade: 'junior',
			location: 'Москва',
			activity: 1,
			categoryTasks: 35,
			totalTasks: 9999,
		},
	},
} satisfies Meta<typeof CardVolunteer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Card');
		await expect(element).toBeInTheDocument();
	},
};
