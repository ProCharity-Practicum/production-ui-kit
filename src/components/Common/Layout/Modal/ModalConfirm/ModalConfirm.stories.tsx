import { Meta, StoryObj } from '@storybook/react';
import { ModalConfirm } from './ModalConfirm';
import { expect, fn, within } from '@storybook/test';

const meta = {
	title: 'Common/Layout/ModalConfirm',
	component: ModalConfirm,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div
				style={{
					width: '100%',
					height: '100vh',
				}}
			>
				<Story />
			</div>
		),
	],
	args: {
		title: 'Удалить данные сотрудника?',
		text: 'Удалить',
		children: <div>Данные о сотруднике Яковлев Анатолий будут удалены</div>,
		onConfirm: fn(),
		onClose: fn(),
	},
} satisfies Meta<typeof ModalConfirm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDisabledButton: Story = {
	...Default,
	args: { disabled: true },
};

export const WithPending: Story = {
	...Default,
	args: { isLoading: true },
};

export const WithCloseOnOverlayClickFalse: Story = {
	args: { options: { closeOnOverlayClick: false } },
};

export const WithStateChanged: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId('ModalConfirm');
		await expect(element).toBeInTheDocument();
	},
};
