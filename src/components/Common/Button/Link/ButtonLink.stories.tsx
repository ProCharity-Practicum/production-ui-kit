import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from '@storybook/test';

import { AddLink, ButtonLink, GoToLink, ShowMoreLink } from './ButtonLink';
import { Icon } from '@/components/Core/Icon/Icon';
import {
	ButtonLinkColor,
	ButtonLinkVariant,
} from '@/components/Common/Button/types';

const COLORS = Object.values(ButtonLinkColor);

const meta = {
	title: 'Common/Actions/Button/Link',
	component: ButtonLink,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: Object.values(ButtonLinkVariant),
		},
		color: {
			control: { type: 'select' },
			options: COLORS,
		},
	},
	args: {
		onClick: fn(),
	},
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Button Label',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Link');
		await expect(element).toBeInTheDocument();
	},
};

export const Styles: Story = {
	args: {
		children: 'Button Label',
	},
	render: (props) => (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: `repeat(${2}, 1fr)`,
				gap: '2rem',
			}}
		>
			{COLORS.map((color) => (
				<ButtonLink
					key={color}
					{...props}
					color={color}
					icon={<Icon name="add" />}
					variant={ButtonLinkVariant.Link}
				/>
			))}
		</div>
	),
};

export const Add: Story = {
	render: (props) => <AddLink {...props} />,
};

export const ShowMore: Story = {
	render: (props) => <ShowMoreLink {...props} />,
};

export const GoTo: Story = {
	render: (props) => <GoToLink {...props} />,
};
