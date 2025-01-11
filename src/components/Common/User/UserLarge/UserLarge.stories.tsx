import type { Meta, StoryObj } from '@storybook/react';
import { UserLarge } from './UserLarge';
import { expect, within } from '@storybook/test';

const meta: Meta<typeof UserLarge> = {
	title: 'Common/Content/User/UserLarge',
	component: UserLarge,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {
		title: 'Вася Пупкин',
		image: undefined,
		infoTextUp: 'Волонтер-исполнитель',
		infoTextDown: 'Москва',
	},
	decorators: [
		(Story) => (
			<div style={{ minWidth: '360px', height: '96px' }}>
				<Story />
			</div>
		),
	],
};
export default meta;
type Story = StoryObj<typeof UserLarge>;

export const Default: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('User');
		await expect(element).toBeInTheDocument();
	},
};

export const Junior: Story = {
	args: {
		seniority: 'junior',
	},
};

export const Middle: Story = {
	args: {
		seniority: 'middle',
	},
};

export const Senior: Story = {
	args: {
		seniority: 'senior',
	},
};
