import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { CardVolunteerList } from './CardVolunteerList';
import avatar from '../../../../assets/images/avatar_image.png';

const meta: Meta<typeof CardVolunteerList> = {
	title: 'Common/Content/Card/Volunteer/CardVolunteerList',
	component: CardVolunteerList,
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
type Story = StoryObj<typeof CardVolunteerList>;

export const Default: Story = {
	args: {
		title: 'Имя Фамилия',
		location: 'Location',
		image: avatar,
		ageInProject: 5,
		lastVisit: '3 января 2024',
		task: 35,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Card');
		await expect(element).toBeInTheDocument();
	},
};

export const AnchorCard: Story = {
	args: {
		title: 'Имя Фамилия',
		location: 'Location',
		image: avatar,
		ageInProject: 2,
		lastVisit: '3 января 2024',
		task: 35,
		href: 'https://music.yandex.ru/',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Card');
		await expect(element).toBeInTheDocument();
	},
};
