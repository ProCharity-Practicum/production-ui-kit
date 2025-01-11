import type { Meta, StoryObj } from '@storybook/react';
import { User } from './User';
import { expect, within } from '@storybook/test';

import avatarExample from '/examples/volunteer_avatar.png?url';
import { Shape } from '@/components/Common/User/Avatar/Shape.tsx';

const meta: Meta<typeof User> = {
	title: 'Common/Content/User/User',
	component: User,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {
		title: 'Вася Пупкин',
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
type Story = StoryObj<typeof User>;

export const Default: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('User');
		await expect(element).toBeInTheDocument();
	},
};

export const AfterText: Story = {
	args: {
		afterText: 'Москва',
	},
};

export const BeforeText: Story = {
	args: {
		beforeText: 'Волонтер',
		image: avatarExample,
	},
};

export const SquareAvatar: Story = {
	args: {
		afterText: 'Москва',
		shape: Shape.Square,
	},
};
