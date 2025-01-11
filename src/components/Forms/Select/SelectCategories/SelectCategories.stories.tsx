import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { SelectCategories, SelectCategoriesProps } from './SelectCategories';
import { useArgs } from '@storybook/preview-api';

const meta = {
	title: 'Forms/Select/SelectCategories',
	component: SelectCategories,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
		// viewport: {
		// 	defaultViewport: 'desktop',
		// },
	},
	decorators: [
		(Story) => {
			const [args, updateArgs] = useArgs<SelectCategoriesProps>();

			function setInitialValues(values: string[]) {
				updateArgs({
					initialValues: values,
				});
			}

			return <Story args={{ ...args, setInitialValues }} />;
		},
	],
	args: {
		label: 'Выберите категории',
		options: [
			{
				title: 'Категория 1',
				values: ['1', '2', '3', '4', '5'],
			},
			{
				title: 'Категория 2',
				values: ['6', '7', '8', '9', '10'],
			},
			{
				title: 'Категория 3',
				values: ['11', '12', '13', '14', '15'],
			},
		],
	},
} satisfies Meta<typeof SelectCategories>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('SelectCategories');
		await expect(element).toBeInTheDocument();
	},
};

export const MultipleOption: Story = {
	args: {
		initialValues: ['1', '3', '7', '10'],
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('SelectCategories');
		await expect(element).toBeInTheDocument();
	},
};

export const Single: Story = {
	args: {
		initialValues: ['1', '3'],
		options: [
			{
				title: '',
				values: ['1', '2', '3', '4', '5'],
			},
		],
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('SelectCategories');
		await expect(element).toBeInTheDocument();
	},
};
