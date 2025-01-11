import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CardNumbers } from './CardNumbers';

const meta: Meta<typeof CardNumbers> = {
	title: 'Common/Content/Card/CardNumbers',
	component: CardNumbers,
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
type Story = StoryObj<typeof CardNumbers>;

export const Default: Story = {
	args: {
		title: 249,
		text: 'задач выполнено за месяц',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('CardNumbers');
		await expect(element).toBeInTheDocument();
	},
};
