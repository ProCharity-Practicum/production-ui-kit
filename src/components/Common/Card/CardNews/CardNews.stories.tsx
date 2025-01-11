import type { Meta, StoryObj } from '@storybook/react';
import { CardNews, ShapeImage } from './CardNews';
import { expect, within } from '@storybook/test';

const meta: Meta<typeof CardNews> = {
	title: 'Common/Content/Card/CardNews',
	component: CardNews,
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
type Story = StoryObj<typeof CardNews>;

export const Default: Story = {
	args: {
		title:
			'Очень длинный заголовок новости в несколько строк описывающий содержание и имена героев',
		formAvatar: ShapeImage.circle,
		infoDate: '16.10.2020',
		userImage: '',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Card');
		await expect(element).toBeInTheDocument();
	},
};
