import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent, fn } from '@storybook/test';
import { useState } from 'react';
import { ToggleSort, type SortDirection } from './ToggleSort';

const SORT_BUTTONS = [
	{ id: 'date', label: 'По дате' },
	{ id: 'name', label: 'По имени' },
	{ id: 'price', label: 'По цене' },
];

const meta = {
	title: 'Forms/Toggle/ToggleSort',
	component: ToggleSort,
	parameters: {
		layout: 'centered',
	},
	args: {
		id: 'date',
		title: 'По дате',
		direction: 'none',
		onChange: fn(),
		disabled: false,
	},
	argTypes: {
		direction: {
			control: {
				type: 'select',
				options: ['none', 'asc', 'desc'],
			},
		},
	},
} satisfies Meta<typeof ToggleSort>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [direction, setDirection] = useState<SortDirection>(args.direction);
		return (
			<ToggleSort
				{...args}
				direction={direction}
				onChange={(id, dir) => {
					args.onChange(id, dir);
					setDirection(dir);
				}}
			/>
		);
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button');

		// Проверяем цикл none → asc → desc → asc → desc ...
		await userEvent.click(button);
		await expect(args.onChange).toHaveBeenCalledWith(args.id, 'asc');

		await userEvent.click(button);
		await expect(args.onChange).toHaveBeenCalledWith(args.id, 'desc');

		await userEvent.click(button);
		await expect(args.onChange).toHaveBeenCalledWith(args.id, 'asc');

		await userEvent.click(button);
		await expect(args.onChange).toHaveBeenCalledWith(args.id, 'desc');
	},
};

export const MultipleSortButtons: Story = {
	parameters: { controls: { disable: true } },
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [activeSort, setActiveSort] = useState<{
			id: string;
			direction: SortDirection;
		} | null>(null);

		const handleChange = (id: string, direction: SortDirection) => {
			// При переключении другой кнопки сбрасываем текущую
			if (activeSort?.id !== id) {
				setActiveSort({ id, direction: 'asc' });
			} else {
				setActiveSort(direction === 'none' ? null : { id, direction });
			}
		};

		return (
			<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
				{SORT_BUTTONS.map(({ id, label }) => (
					<ToggleSort
						key={id}
						id={id}
						title={label}
						direction={activeSort?.id === id ? activeSort.direction : 'none'}
						onChange={handleChange}
					/>
				))}
			</div>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const buttons = canvas.getAllByRole('button');

		// Проверяем переключение между кнопками
		await userEvent.click(buttons[0]); // date → asc
		await expect(buttons[0]).toHaveAttribute('aria-pressed', 'true');

		await userEvent.click(buttons[0]); // date → desc
		await expect(buttons[0]).toHaveAttribute('aria-pressed', 'true');

		await userEvent.click(buttons[1]); // name → asc, date → none
		await expect(buttons[0]).toHaveAttribute('aria-pressed', 'false');
		await expect(buttons[1]).toHaveAttribute('aria-pressed', 'true');

		await userEvent.click(buttons[1]); // name → desc
		await expect(buttons[1]).toHaveAttribute('aria-pressed', 'true');
	},
};
