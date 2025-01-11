import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from '@storybook/test';

import { Button } from './Button';
import { ButtonType, ButtonVariant } from '@/components/Common/Button/types';

const meta = {
	title: 'Common/Actions/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: Object.values(ButtonVariant),
		},
		type: {
			control: { type: 'radio' },
			options: Object.values(ButtonType),
		},
	},
	args: {
		children: 'Button Label',
		onClick: fn(),
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Button');
		await expect(element).toBeInTheDocument();
	},
};

const Variants = Object.values(ButtonVariant);

export const Styles: Story = {
	render: (props) => (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: `repeat(${Variants.length}, 1fr)`,
				gap: '2rem',
			}}
		>
			{Variants.map((variant) => (
				<Button {...props} key={variant} variant={variant} />
			))}
			{Variants.map((variant) => (
				<Button {...props} key={variant} variant={variant} disabled={true} />
			))}
			{Variants.map((variant) => (
				<Button {...props} key={variant} variant={variant} waiting={true} />
			))}
		</div>
	),
};
