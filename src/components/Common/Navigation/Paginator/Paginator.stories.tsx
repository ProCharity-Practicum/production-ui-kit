import { Paginator } from './Paginator';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { useState } from 'react';

const meta: Meta<typeof Paginator> = {
	title: 'Common/Navigation/Paginator',
	component: Paginator,
	argTypes: {
		current: {
			control: { type: 'number', min: 1 },
			description: 'Текущая страница',
		},
		total: {
			control: { type: 'number', min: 1 },
			description: 'Общее количество страниц',
		},
		maxPages: {
			control: { type: 'number', min: 3, max: 10 },
			description: 'Максимальное количество отображаемых страниц',
		},
	},
};

export default meta;

// Компонент-обертка для управления состоянием
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InteractivePaginator = (props: any) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
	const [currentPage, setCurrentPage] = useState(props.current);

	const handlePageChange = (page: number) => {
		console.log('вызов getLink');
		setCurrentPage(page);
		console.log(`Navigating to page ${page}`);
	};

	return (
		<Paginator
			{...props}
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			current={currentPage}
			getLink={(page) => () => handlePageChange(page)}
		/>
	);
};

type Story = StoryObj<typeof Paginator>;

export const Default: Story = {
	args: {
		current: 3,
		total: 10,
		maxPages: 5,
	},
	render: (args) => <InteractivePaginator {...args} />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByText('3')).toBeInTheDocument();
	},
};

export const FirstPage: Story = {
	args: {
		current: 1,
		total: 10,
	},
	render: (args) => <InteractivePaginator {...args} />,
};

export const LastPage: Story = {
	args: {
		current: 10,
		total: 10,
	},
	render: (args) => <InteractivePaginator {...args} />,
};

export const QueryParamsPreservation: StoryObj<typeof Paginator> = {
	args: {
		current: 1,
		total: 5,
	},
	render: (args) => {
		// Эмуляция URL с параметрами
		const getLink = (page: number) => `?page=${page}&filter=test&sort=asc`;
		return <Paginator {...args} getLink={getLink} />;
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const page2 = canvas.getByText('2');

		// Проверяем что параметры сохраняются в ссылках
		await expect(page2).toHaveAttribute('href', '?page=2&filter=test&sort=asc');
	},
};
