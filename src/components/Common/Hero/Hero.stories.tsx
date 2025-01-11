import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';

const meta = {
	title: 'New/Hero',
	component: Hero,
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof Hero>;

export const WithStateChanged: Story = {
	args: {
		children: (
			<>
				<h1>Приcоединяйся к ProChatity!</h1>
				<p>
					Какой-то мотивирующий зарегистрироваться текст для всех категорий
					пользователей
				</p>
				<button>Присоединиться</button>
			</>
		),
	},
};
