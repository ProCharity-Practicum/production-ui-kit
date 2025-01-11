import type { Meta, StoryObj } from '@storybook/react';
import { UserLargeVertical } from './UserLargeVertical';
import { expect, within } from '@storybook/test';
import { UserAlignment } from '@/components/Common/User/types.ts';
import { Shape } from '@/components/Common/User';

const meta: Meta<typeof UserLargeVertical> = {
	title: 'Common/Content/User/UserLargeVertical',
	component: UserLargeVertical,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		align: {
			control: 'radio',
			options: Object.values(UserAlignment),
		},
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
type Story = StoryObj<typeof UserLargeVertical>;

export const Default: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('UserLargeVertical');
		await expect(element).toBeInTheDocument();
	},
};

export const WithSquareImage: Story = {
	args: {
		shape: Shape.Square,
	},
};
