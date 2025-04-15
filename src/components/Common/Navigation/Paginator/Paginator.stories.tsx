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
const InteractivePaginator = (
	props: Omit<React.ComponentProps<typeof Paginator>, 'onChangePage'>
) => {
	const [currentPage, setCurrentPage] = useState(props.current);

	const handlePageChange = (page: number) => {
		console.log(`Changing to page ${page}`);
		setCurrentPage(page);
	};

	return (
		<Paginator
			{...props}
			current={currentPage}
			onChangePage={handlePageChange}
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
