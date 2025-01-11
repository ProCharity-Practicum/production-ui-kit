import type { Meta, StoryObj } from '@storybook/react';
import { UserCompanyLarge } from './UserCompanyLarge';
import { expect, fn, within } from '@storybook/test';

const meta: Meta<typeof UserCompanyLarge> = {
	title: 'Common/Content/User/UserCompanyLarge',
	component: UserCompanyLarge,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {},
	decorators: [
		(Story) => (
			<div style={{ minWidth: '360px' }}>
				<Story />
			</div>
		),
	],
};
export default meta;
type Story = StoryObj<typeof UserCompanyLarge>;

export const Default: Story = {
	args: {
		title: 'X5 Group',
		image: undefined,
		linkText: 'x5.ru',
		onClick: fn(),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('UserCompanyLarge');
		await expect(element).toBeInTheDocument();
	},
};
