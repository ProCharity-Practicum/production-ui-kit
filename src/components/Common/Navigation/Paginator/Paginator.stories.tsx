import { Paginator } from './Paginator';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

const meta: Meta<typeof Paginator> = {
	title: 'Common/Navigation/Paginator',
	component: Paginator,
	argTypes: {
		current: {
			control: { type: 'number' },
			description: 'Текущая страница',
		},
		total: {
			control: { type: 'number' },
			description: 'Общее количество страниц',
		},
		maxPages: {
			control: { type: 'number' },
			description: 'Максимальное количество отображаемых страниц',
		},
		getLink: {
			control: false,
			description: 'Функция для генерации ссылок',
		},
	},
};

export default meta;

type Story = StoryObj<typeof Paginator>;

export const Default: Story = {
	args: {
		current: 3,
		total: 10,
		maxPages: 5,
		getLink: (page: number) => `/page/${page}`,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Paginator');
		await expect(element).toBeInTheDocument();
	},
};

export const FirstPage: Story = {
	args: {
		current: 1,
		total: 10,
		maxPages: 5,
		getLink: (page: number) => `/page/${page}`,
	},
};

export const LastPage: Story = {
	args: {
		current: 10,
		total: 10,
		maxPages: 5,
		getLink: (page: number) => `/page/${page}`,
	},
};
