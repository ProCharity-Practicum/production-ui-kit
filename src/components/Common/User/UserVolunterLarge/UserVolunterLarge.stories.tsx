import type { Meta, StoryObj } from '@storybook/react';
import { UserVolunterLarge } from './UserVolunterLarge';
import { expect, fn, within } from '@storybook/test';

const meta: Meta<typeof UserVolunterLarge> = {
	title: 'Common/Content/User/UserVolunterLarge',
	component: UserVolunterLarge,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {
		title: 'Константинопольский Константин Константинович',
		location: 'Москва',
		registrationDate: '01.01.1999',
		workPlace: 'Компания с длинным названием',
		image: undefined,
		companyLogo: undefined,
		isFavorite: true,
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
type Story = StoryObj<typeof UserVolunterLarge>;

export const Default: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('UserVolunterLarge');
		await expect(element).toBeInTheDocument();
	},
};

export const WithButtons: Story = {
	args: {
		onClickTelegram: fn(),
		onClickEmail: fn(),
	},
};

export const WithLinks: Story = {
	args: {
		telegram: 'example',
		email: 'example@example.com',
	},
};
