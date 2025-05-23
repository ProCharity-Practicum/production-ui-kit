import { Meta, StoryObj } from '@storybook/react';
import { ProfileStatus } from './ProfileStatus';

const meta: Meta<typeof ProfileStatus> = {
	title: 'Common/ProfileStatus',
	component: ProfileStatus,
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<typeof ProfileStatus>;

export const StatusNew: Story = {
	args: {
		children: 'test status',
		status: 'new',
		tooltipText: 'Зачем заполнять профиль на 100% (соревнование волонтеров)',
	},
};

export const StatusConfirmed: Story = {
	args: {
		children: 'test status',
		status: 'confirmed',
		tooltipText: 'Зачем заполнять профиль на 100% (соревнование волонтеров)',
	},
};

export const StatusProcessing: Story = {
	args: {
		children: 'test status',
		status: 'processing',
		tooltipText: 'Зачем заполнять профиль на 100% (соревнование волонтеров)',
	},
};
