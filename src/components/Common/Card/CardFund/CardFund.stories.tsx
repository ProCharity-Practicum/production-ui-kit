import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { CardFund } from './CardFund';

const meta: Meta<typeof CardFund> = {
	title: 'Common/Content/Card/Fund/CardFund',
	component: CardFund,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {
		title: 'Краткое название организации',
		ageInProject: 2,
		currentTasks: 35,
		completedTasks: 9999,
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
type Story = StoryObj<typeof CardFund>;

export const Default: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Card');
		await expect(element).toBeInTheDocument();
	},
};
