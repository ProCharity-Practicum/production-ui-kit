import { Meta, StoryObj } from '@storybook/react';
import { ModalConfirm } from './ModalConfirm';
import { useState } from 'react';

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
					display: 'grid',
					placeItems: 'center',
				}}
			>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof ModalConfirm>;

export default meta;

type Story = StoryObj<typeof ModalConfirm>;

export const Default: Story = {
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [isOpen, setIsOpen] = useState(true);

		return isOpen ? (
			<ModalConfirm
				title="Удалить данные сотрудника?"
				onConfirm={() => {
					alert('Действие подтверждено!');
					setIsOpen(false);
				}}
				onClose={() => setIsOpen(false)}
				text="Удалить"
			>
				<div>Данные о сотруднике Яковлев Анатолий будут удалены</div>
			</ModalConfirm>
		) : (
			<button onClick={() => setIsOpen(true)}>Открыть модалку</button>
		);
	},
};
