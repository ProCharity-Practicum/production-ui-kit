import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Text } from './Text';
import { TextVariants } from '@/components/Core/Typography/Text/TextVariants.tsx';

const meta = {
	title: 'Common/Typography/Text',
	component: Text,
	tags: ['autodocs'],
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
		// viewport: {
		// 	defaultViewport: 'desktop',
		// },
	},
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Text');
		await expect(element).toBeInTheDocument();
	},
};

export const Variants: Story = {
	args: {
		children: 'Some long text string',
	},
	render: (props) => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
			}}
		>
			{Object.values(TextVariants).map((variant) => (
				<Text {...props} key={variant} variant={variant} />
			))}
		</div>
	),
};
