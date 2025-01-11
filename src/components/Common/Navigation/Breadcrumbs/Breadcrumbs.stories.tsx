import type { Meta, StoryObj } from '@storybook/react';
import { BreadCrumbs } from './Breadcrumbs';
import { expect, within } from '@storybook/test';

const meta: Meta<typeof BreadCrumbs> = {
	title: 'Common/Navigation/BreadCrumbs',
	component: BreadCrumbs,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<typeof BreadCrumbs>;

export const Default: Story = {
	args: {
		crumbs: [{ url: '', label: 'Регистрация' }],
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Breadcrumbs');
		await expect(element).toBeInTheDocument();
	},
};

export const ThreeBreadCrumbs: Story = {
	args: {
		crumbs: [
			{ url: '#', label: 'Регистрация' },
			{ url: '#', label: 'Волонтер' },
			{ url: '', label: 'НКО' },
		],
	},
};

export const FiveBreadCrumbs: Story = {
	args: {
		crumbs: [
			{ url: '#', label: 'Регистрация' },
			{ url: '#', label: 'Волонтер' },
			{ url: '#', label: 'НКО' },
			{ url: '#', label: 'Личный кабинет' },
			{ url: '', label: 'Редактирование профиля' },
		],
	},
};

export const TenBreadCrumbs: Story = {
	args: {
		crumbs: [
			{ url: '#', label: 'Регистрация' },
			{ url: '#', label: 'Волонтер' },
			{ url: '#', label: 'НКО' },
			{ url: '#', label: 'Личный кабинет' },
			{ url: '#', label: 'Регистрация' },
			{ url: '#', label: 'Волонтер' },
			{ url: '#', label: 'НКО' },
			{ url: '#', label: 'Личный кабинет' },
			{ url: '#', label: 'Регистрация' },
			{ url: '', label: 'Редактирование профиля' },
		],
	},
};

export const TwoBreadCrumbs: Story = {
	args: {
		crumbs: [
			{ url: '#', label: 'Регистрация' },
			{ url: '', label: 'НКО' },
		],
	},
};
