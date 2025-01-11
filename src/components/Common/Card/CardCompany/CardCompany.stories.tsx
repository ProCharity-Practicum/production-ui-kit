import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { CardCompany } from './CardCompany';

const meta: Meta<typeof CardCompany> = {
	title: 'Common/Content/Card/Volunteer/CardCompany',
	component: CardCompany,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {},
	decorators: [
		(Story) => (
			<div style={{ maxWidth: '360px' }}>
				<Story />
			</div>
		),
	],
};
export default meta;
type Story = StoryObj<typeof CardCompany>;

export const Default: Story = {
	args: {
		title: 'Т-Банк',
		ageInProject: 5,
		help: 61,
		task: 112,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Card');
		await expect(element).toBeInTheDocument();
	},
};
