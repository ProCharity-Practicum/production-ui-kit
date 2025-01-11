import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { SectionNotificationChannel } from './SectionNotificationChannel';

const meta = {
	title: 'Forms/SectionNotificationChannel',
	component: SectionNotificationChannel,
	parameters: {
		layout: 'centered',
	},
	args: {
		variant: 'profile',
	},
} satisfies Meta<typeof SectionNotificationChannel>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const ProfileCompanies: Story = {
	args: {
		variant: 'profileCompany',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('SectionNotificationChannel');
		await expect(element).toBeInTheDocument();
	},
};

export const Profile: Story = {
	args: {
		variant: 'profile',
		currentChannel: 'telegram',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('SectionNotificationChannel');
		await expect(element).toBeInTheDocument();
	},
};

export const currentTasksFund: Story = {
	args: {
		variant: 'currentTasksFund',
		currentChannel: 'telegram',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('SectionNotificationChannel');
		await expect(element).toBeInTheDocument();
	},
};

export const currentTasksVolunteer: Story = {
	args: {
		variant: 'currentTasksVolunteer',
		currentChannel: 'telegram',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('SectionNotificationChannel');
		await expect(element).toBeInTheDocument();
	},
};

export const Employees: Story = {
	args: {
		variant: 'employees',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('SectionNotificationChannel');
		await expect(element).toBeInTheDocument();
	},
};

export const ProCharityFund: Story = {
	args: {
		variant: 'proCharityFund',
		currentChannel: 'telegram',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('SectionNotificationChannel');
		await expect(element).toBeInTheDocument();
	},
};

export const ProCharityVolunteer: Story = {
	args: {
		variant: 'proCharityVolunteer',
		currentChannel: 'telegram',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('SectionNotificationChannel');
		await expect(element).toBeInTheDocument();
	},
};

export const ProCharityCompany: Story = {
	args: {
		variant: 'proCharityCompany',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('SectionNotificationChannel');
		await expect(element).toBeInTheDocument();
	},
};

export const newTasks: Story = {
	args: {
		variant: 'newTasks',
		currentChannel: 'telegram',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('SectionNotificationChannel');
		await expect(element).toBeInTheDocument();
	},
};

export const newTasksCompany: Story = {
	args: {
		variant: 'newTasksCompany',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('SectionNotificationChannel');
		await expect(element).toBeInTheDocument();
	},
};
