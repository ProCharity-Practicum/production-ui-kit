import type { Meta, StoryObj } from '@storybook/react';
import { Title } from './Title';

const meta = {
	title: 'Common/Typography/Title',
	component: Title,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		Tag: {
			options: ['h1', 'h2', 'h3', 'h4', 'h5'],
			control: { type: 'select' },
		},
		children: {
			type: 'string', // Тип свойства (строка)
			defaultValue: 'Регистрация', // Значение по умолчанию
		},
	},
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof Title>;

export const Default: Story = {
	render: () => (
		<div>
			<Title Tag="h1">H1 Long title</Title>
			<Title Tag="h2">H2 Long title</Title>
			<Title Tag="h3">H3 Long title</Title>
			<Title Tag="h4">H4 Long title</Title>
			<Title Tag="h5">H5 Long title</Title>
		</div>
	),
};
