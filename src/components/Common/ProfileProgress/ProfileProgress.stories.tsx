import { Meta, StoryObj } from '@storybook/react';
import { ProfileProgress } from './ProfileProgress';
import { StatusProfile } from './ProfileStatus/type';

const meta: Meta<typeof ProfileProgress> = {
	title: 'Common/ProfileProgress',
	component: ProfileProgress,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof ProfileProgress>;

export const Default: Story = {
	args: {
		status: StatusProfile.NEW,
		statusText: 'Новый',
		progressValue: 45,
		tooltipText: {
			statusText: 'Это подсказка о статусе профиля',
			progressText: 'Это подсказка о прогрессе заполнения',
		},
	},
};

export const NoConfirmed: Story = {
	args: {
		status: StatusProfile.NEW,
		statusText: 'Не подтверждён',
		progressValue: 15,
		tooltipText: {
			statusText: 'Это подсказка о статусе профиля',
			progressText: 'Это подсказка о прогрессе заполнения',
		},
	},
};

export const Confirmed: Story = {
	args: {
		status: StatusProfile.CONFIRMED,
		statusText: 'Подтвержден',
		progressValue: 100,
		tooltipText: {
			statusText: 'Это подсказка о статусе профиля',
			progressText: 'Это подсказка о прогрессе заполнения',
		},
	},
};

export const Processing: Story = {
	args: {
		status: StatusProfile.PROCESSING,
		statusText: 'В обработке',
		progressValue: 75,
		tooltipText: {
			statusText: 'Это подсказка о статусе профиля',
			progressText: 'Это подсказка о прогрессе заполнения',
		},
	},
};
