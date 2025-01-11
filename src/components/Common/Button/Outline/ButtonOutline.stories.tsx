import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from '@storybook/test';

import { ButtonOutline } from './ButtonOutline';
import { Icon } from '@/components/Core/Icon/Icon';

const meta = {
	title: 'Common/Actions/Button/Outline',
	component: ButtonOutline,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		children: 'Button Label',
		onClick: fn(),
	},
} satisfies Meta<typeof ButtonOutline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('ButtonOutline');
		await expect(element).toBeInTheDocument();
	},
};

export const WithIcon: Story = {
	args: {
		icon: 'socialLogo',
	},
};

export const WithIconOnly: Story = {
	name: 'With Icon Only (@todo: dynamic sizing)',
	args: {
		children: undefined,
	},
	render: (props) => (
		<div
			style={{
				display: 'grid',
				gap: '1rem',
				gridTemplateColumns: 'repeat(3, 1fr)',
			}}
		>
			{[12, 16, 20, 24, 28, 32].map((size) => (
				<ButtonOutline
					key={size}
					{...props}
					icon={<Icon name="socialLogo" size={size}></Icon>}
				/>
			))}
		</div>
	),
};

export const WithCounter: Story = {
	args: {
		counter: 5,
	},
};

export const IconAndCounter: Story = {
	args: {
		icon: 'comment',
		counter: 10,
		children: undefined,
	},
};

export const IconAndZeroCounter: Story = {
	args: {
		icon: 'comment',
		counter: 0,
		children: undefined,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
