import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from '@storybook/test';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta = {
	title: 'Forms/Checkbox',
	component: Checkbox,
	parameters: {
		layout: 'centered',
	},
	args: {
		variant: 'Ministry',
		checked: false,
		onChange: () => {},
	},
	render: (args) => {
		// Используем обертку для управления состоянием
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [checked, setChecked] = useState(args.checked);
		return (
			<Checkbox
				{...args}
				checked={checked}
				onChange={(newChecked) => {
					setChecked(newChecked);
					args.onChange?.(newChecked);
				}}
			/>
		);
	},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonPlay = async (canvasElement: HTMLElement) => {
	const canvas = within(canvasElement);
	const checkbox = canvas.getByTestId('checkbox');
	const text = canvas.getByTestId('checkbox-text');
	await expect(checkbox).toBeInTheDocument();
	await expect(text).toBeInTheDocument();
};

export const MinistryCheckbox: Story = {
	args: {
		variant: 'Ministry',
	},
	play: async ({ canvasElement }) => {
		await commonPlay(canvasElement);
		const canvas = within(canvasElement);
		const checkbox = canvas.getByTestId('checkbox');
		await userEvent.click(checkbox);
		await expect(checkbox).toBeChecked();
	},
};

export const SiteRulesCheckbox: Story = {
	args: {
		variant: 'SiteRules',
	},
	play: async ({ canvasElement }) => {
		await commonPlay(canvasElement);
	},
};

export const ReviewCheckbox: Story = {
	args: {
		variant: 'Review',
	},
	play: async ({ canvasElement }) => {
		await commonPlay(canvasElement);
	},
};

export const MaterialsCheckbox: Story = {
	args: {
		variant: 'Materials',
	},
	play: async ({ canvasElement }) => {
		await commonPlay(canvasElement);
	},
};

export const AdminCheckbox: Story = {
	args: {
		variant: 'Admin',
	},
	play: async ({ canvasElement }) => {
		await commonPlay(canvasElement);
	},
};

export const InteractiveExample: Story = {
	args: {
		variant: 'SiteRules',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const checkbox = canvas.getByTestId('checkbox');

		// Проверяем начальное состояние
		await expect(checkbox).not.toBeChecked();

		// Кликаем и проверяем изменение состояния
		await userEvent.click(checkbox);
		await expect(checkbox).toBeChecked();

		// Кликаем еще раз
		await userEvent.click(checkbox);
		await expect(checkbox).not.toBeChecked();
	},
};
