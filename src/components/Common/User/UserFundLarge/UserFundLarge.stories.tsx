import type { Meta, StoryObj } from '@storybook/react';
import { UserFundLarge } from './UserFundLarge';
import { expect, fn, within } from '@storybook/test';

const meta: Meta<typeof UserFundLarge> = {
	title: 'Common/Content/User/UserFundLarge',
	component: UserFundLarge,
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
type Story = StoryObj<typeof UserFundLarge>;

export const Default: Story = {
	args: {
		title:
			'Благотворительный фонд помощи детям с онкогематологическими и иными тяжелыми заболеваниями«ДоброСвет»',
		infoText: 'Москва',
		image: undefined,
		linkText: 'Перейти по ссылке',
		onClick: fn(),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('UserFundLarge');
		await expect(element).toBeInTheDocument();
	},
};
