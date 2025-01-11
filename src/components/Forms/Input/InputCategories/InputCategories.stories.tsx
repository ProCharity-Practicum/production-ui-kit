import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { InputCategories } from './InputCategories';

const meta = {
	title: 'Forms/Input/Categories',
	component: InputCategories,
	parameters: {
		controls: {
			include: ['filters'],
		},
		layout: 'centered',
		viewport: {
			defaultViewport: 'desktop',
		},
	},
} satisfies Meta<typeof InputCategories>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Input');
		await expect(element).toBeInTheDocument();
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
};
