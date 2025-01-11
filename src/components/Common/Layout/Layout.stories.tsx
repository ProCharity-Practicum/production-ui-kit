import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Layout } from './Layout';

import HeaderStory from './Header/Header.stories';
import FooterStory from './Footer/Footer.stories';
import { FooterProps } from '@/components/Common/Layout/Footer/Footer.tsx';
import {
	Header,
	HeaderProps,
} from '@/components/Common/Layout/Header/Header.tsx';

const meta = {
	title: 'Common/Layout',
	component: Layout,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'fullscreen',
		// viewport: {
		// 	defaultViewport: 'desktop',
		// },
	},
	args: {
		children: <Layout.Section>Layout</Layout.Section>,
		user: (
			<Header.GuestUser
				signUpLink={() => console.log('sign-up')}
				signInLink={() => console.log('sign-in')}
			/>
		),
		headerSettings: HeaderStory.args as HeaderProps,
		footerSettings: FooterStory.args as FooterProps,
	},
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Layout');
		await expect(element).toBeInTheDocument();
	},
};
