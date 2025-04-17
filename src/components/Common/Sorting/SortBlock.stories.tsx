import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent, fn } from '@storybook/test';
import { useState } from 'react';
import { SortBlock } from './SortBlock';

const SORT_OPTIONS = [
	{ label: 'По дате', value: 'date' },
	{ label: 'По имени', value: 'name' },
	{ label: 'По цене', value: 'price' },
];

const meta = {
	title: 'Components/Common/SortBlock',
	component: SortBlock,
	parameters: {
		layout: 'centered',
	},
	args: {
		count: 5,
		total: 20,
		sortOptions: SORT_OPTIONS,
		onSortChange: fn(),
		filled: false,
	},
	argTypes: {
		count: { control: { type: 'number', min: 0 } },
		total: { control: { type: 'number', min: 0 } },
		filled: { control: 'boolean' },
	},
} satisfies Meta<typeof SortBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: function Render(args) {
		const [, setSortState] = useState<{
			value: string;
			direction: 'asc' | 'desc';
		} | null>(null);

		return (
			<SortBlock
				{...args}
				onSortChange={(sort) => {
					args.onSortChange(sort);
					setSortState(sort);
				}}
			/>
		);
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const buttons = canvas.getAllByRole('button');

		await userEvent.click(buttons[0]);
		await expect(args.onSortChange).toHaveBeenCalledWith({
			value: 'date',
			direction: 'asc',
		});
	},
};

export const DifferentContainerSizes: Story = {
	render: function Render(args) {
		const [, setSortState] = useState<{
			value: string;
			direction: 'asc' | 'desc';
		} | null>(null);

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
				<div
					style={{
						width: '1120px',
						border: '1px dashed #ccc',
						padding: '16px',
					}}
				>
					<h3>Ширина 1120px</h3>
					<SortBlock
						{...args}
						onSortChange={(sort) => {
							args.onSortChange(sort);
							setSortState(sort);
						}}
					/>
				</div>

				<div
					style={{ width: '800px', border: '1px dashed #ccc', padding: '16px' }}
				>
					<h3>Ширина 800px</h3>
					<SortBlock
						{...args}
						onSortChange={(sort) => {
							args.onSortChange(sort);
							setSortState(sort);
						}}
					/>
				</div>

				<div
					style={{ width: '550px', border: '1px dashed #ccc', padding: '16px' }}
				>
					<h3>Ширина 550px</h3>
					<SortBlock
						{...args}
						onSortChange={(sort) => {
							args.onSortChange(sort);
							setSortState(sort);
						}}
					/>
				</div>
			</div>
		);
	},
	parameters: {
		controls: { disable: true },
	},
};
