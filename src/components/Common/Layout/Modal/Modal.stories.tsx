import { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { expect, within } from '@storybook/test';
import { fn } from '@storybook/test';

const meta = {
	title: 'Common/Layout/Modal',
	component: Modal,
	tags: ['autodocs'],
	args: {
		children: (
			<div style={{ padding: '20px' }}>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas ipsum
				dignissimos deserunt impedit praesentium voluptatem ex ducimus vel ut
				excepturi, unde vitae maiores adipisci accusamus repudiandae deleniti
				minima, inventore molestiae.
			</div>
		),
		onClose: fn(),
	},
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div style={{ minWidth: '800px', minHeight: '800px' }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCloseOnOverlayClickTrue: Story = {
	args: { options: { closeOnOverlayClick: true } },
};

export const WithStateChanged: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('Modal');
		await expect(element).toBeInTheDocument();
	},
};
