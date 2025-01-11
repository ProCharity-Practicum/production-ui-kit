import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from '@storybook/test';

import { Anchor } from './Anchor';
import { AnchorProvider } from '@/components/Core/Anchor/AnchorProvider.tsx';
import { ButtonHTMLAttributes } from 'react';

const meta = {
	title: 'Common/Navigation/Anchor',
	component: Anchor,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
		// viewport: {
		// 	defaultViewport: 'desktop',
		// },
	},
	args: {
		children: 'Anchor link text',
	},
} satisfies Meta<typeof Anchor>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Anchor');
		await expect(element).toBeInTheDocument();
	},
};

export const WithStringLocalHref: Story = {
	args: {
		href: '/path/to/page',
	},
};

export const WithStringRemoteHref: Story = {
	args: {
		href: 'https://example.com/path/to/page',
	},
};

export const WithCallbackHref: Story = {
	args: {
		href: fn(),
	},
};

export const WithReplacedElement: Story = {
	args: {
		href: 'page_name',
		onClick: fn(),
	},
	render: (props) => {
		return (
			<AnchorProvider
				LinkElement={(props) => (
					<button {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} />
				)}
			>
				<Anchor {...props} />
			</AnchorProvider>
		);
	},
};
