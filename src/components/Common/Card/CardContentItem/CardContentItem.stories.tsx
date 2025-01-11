import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from '@storybook/test';

import { CardContentItem } from './CardContentItem';

const meta: Meta<typeof CardContentItem> = {
	title: 'Common/Content/Card/CardContentItem',
	component: CardContentItem,
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
type Story = StoryObj<typeof CardContentItem>;

export const Default: Story = {
	args: {
		title: 'Начало работы с платформой',
		text: 'Что сделать, чтобы получить интеллектуальную помощь.',
		onClick: fn(),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Card');
		await expect(element).toBeInTheDocument();
	},
};
