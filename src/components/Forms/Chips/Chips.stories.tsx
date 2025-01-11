import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Chips } from './Chips';
import { useArgs } from '@storybook/preview-api';

const meta = {
	title: 'Forms/Chips',
	component: Chips,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => {
			const [args, updateArgs] = useArgs<{ filters: string[] }>();

			function onDelete(filter: string) {
				updateArgs({
					filters: args.filters.filter((f: string) => f !== filter),
				});
			}

			return <Story id="Chips" args={{ ...args, onDelete }} />;
		},
	],
	argTypes: {
		filters: { control: 'object' },
	},
	args: {
		filters: [
			'Соцсети, инфографика, презентации',
			'Обучение и тренинги',
			'Работа с текстами',
			'Email рассылка',
			'Реклама',
			'Животным',
			'Детям',
		],
	},
} satisfies Meta<typeof Chips>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const DefaultChips: Story = {
	args: {
		filters: [
			'Соцсети, инфографика, презентации',
			'Обучение и тренинги',
			'Работа с текстами',
			'Email рассылка',
			'Реклама',
			'Животным',
			'Детям',
		],
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Chips');
		await expect(element).toBeInTheDocument();
	},
};
