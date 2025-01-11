import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

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
	},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const MinistryCheckbox: Story = {
	args: {
		variant: 'Ministry',
		checked: false,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const checkbox = canvas.getByTestId('checkbox');
		const text = canvas.getByTestId('checkbox-text');
		await expect(checkbox).toBeInTheDocument();
		await expect(text).toBeInTheDocument();
	},
};

export const SiteRulesCheckbox: Story = {
	args: {
		variant: 'SiteRules',
		checked: false,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const checkbox = canvas.getByTestId('checkbox');
		const text = canvas.getByTestId('checkbox-text');
		await expect(checkbox).toBeInTheDocument();
		await expect(text).toBeInTheDocument();
	},
};

export const ReviewCheckbox: Story = {
	args: {
		variant: 'Review',
		checked: false,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const checkbox = canvas.getByTestId('checkbox');
		const text = canvas.getByTestId('checkbox-text');
		await expect(checkbox).toBeInTheDocument();
		await expect(text).toBeInTheDocument();
	},
};

export const MaterialsCheckbox: Story = {
	args: {
		variant: 'Materials',
		checked: false,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const checkbox = canvas.getByTestId('checkbox');
		const text = canvas.getByTestId('checkbox-text');
		await expect(checkbox).toBeInTheDocument();
		await expect(text).toBeInTheDocument();
	},
};

export const AdminCheckbox: Story = {
	args: {
		variant: 'Admin',
		checked: false,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const checkbox = canvas.getByTestId('checkbox');
		const text = canvas.getByTestId('checkbox-text');
		await expect(checkbox).toBeInTheDocument();
		await expect(text).toBeInTheDocument();
	},
};
