import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CardCompanyVolunteer } from './CardCompanyVolunteer';

const meta: Meta<typeof CardCompanyVolunteer> = {
	title: 'Common/Content/Card/Volunteer/Company',
	component: CardCompanyVolunteer,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {
		user: {
			name: 'Имя Фамилия',
			grade: 'junior',
			location: 'Москва',
			registered: '03.01.2024',
			moderated: '28.09.2024',
			current: 5,
			completed: 45,
			funds: 8,
			hours: 234,
		},
	},
	decorators: [
		(Story) => (
			<div style={{ minWidth: '360px' }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof CardCompanyVolunteer>;

export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Card');
		await expect(element).toBeInTheDocument();
	},
};
