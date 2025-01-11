import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { ToggleNotification } from './ToggleNotification';

const meta = {
	title: 'Forms/Toggle/ToggleNotification',
	component: ToggleNotification,
	parameters: {
		layout: 'centered',
	},
	args: {
		currentChannel: 'telegram',
	},
} satisfies Meta<typeof ToggleNotification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToggleTelegram: Story = {
	args: {
		currentChannel: 'telegram',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Toggle-notification');
		await expect(element).toBeInTheDocument();
	},
};

export const ToggleEmail: Story = {
	args: {
		currentChannel: 'email',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Toggle-notification');
		await expect(element).toBeInTheDocument();
	},
};
