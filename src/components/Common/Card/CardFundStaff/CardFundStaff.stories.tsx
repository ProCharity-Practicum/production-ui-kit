import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from '@storybook/test';

import { CardFundStaff } from './CardFundStaff';

const meta: Meta<typeof CardFundStaff> = {
	title: 'Common/Content/Card/Fund/Staff',
	component: CardFundStaff,
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
type Story = StoryObj<typeof CardFundStaff>;

export const Default: Story = {
	args: {
		title: 'Краткое название организации',
		link: 'https://charity.help/',
		textData: 'Имя Фамилия (Должность сотрудника фонда)',
		textLocation: 'Location',
		onClick: fn(),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Card');
		await expect(element).toBeInTheDocument();
	},
};
