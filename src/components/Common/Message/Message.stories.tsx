import type { Meta, StoryObj } from '@storybook/react';

import { Message } from './Message';

const meta: Meta<typeof Message> = {
	title: 'New/Message',
	component: Message,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof Message>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const WithStateChanged: Story = {
	args: {
		title: 'Приcоединяйся к ProChatity!',
		text: 'Какой-то мотивирующий зарегистрироваться текст для всех категорий пользователей',
		children: <button>Присоединиться</button>,
	},
};
