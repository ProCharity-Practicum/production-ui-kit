import type { Meta, StoryObj } from '@storybook/react';
import { UserTaggedMedium } from './UserTaggedMedium';
import { expect, within } from '@storybook/test';

const meta: Meta<typeof UserTaggedMedium> = {
	title: 'Common/Content/User/UserTaggedMedium',
	component: UserTaggedMedium,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {
		title: 'Вася Пупкин',
		infoText: 'Москва',
		image: undefined,
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
type Story = StoryObj<typeof UserTaggedMedium>;

export const Default: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('UserTaggedMedium');
		await expect(element).toBeInTheDocument();
	},
};

export const Junior: Story = {
	args: {
		grade: 'junior',
	},
};

export const Middle: Story = {
	args: {
		grade: 'middle',
	},
};

export const Senior: Story = {
	args: {
		grade: 'senior',
	},
};
