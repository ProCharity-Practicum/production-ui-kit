import { Meta, StoryObj } from '@storybook/react';
import { ModalTrigger } from './ModalTrigger';
import { ModalConfirm } from '../ModalConfirm/ModalConfirm';

const meta: Meta<typeof ModalTrigger> = {
	title: 'Common/Layout/ModalTrigger',
	component: ModalTrigger,
	tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ModalTrigger>;

export const WithConfirmModal: Story = {
	args: {
		trigger: <button>Удалить элемент</button>,
		renderModal: (onClose: () => void) => (
			<ModalConfirm
				onConfirm={() => {
					alert('Действие подтверждено!');
					onClose();
				}}
				onClose={onClose}
				title="Удалить данные сотрудника?"
				text="Удалить"
			>
				<p>Данные о сотруднике Яковлев Анатолий будут удалены</p>
			</ModalConfirm>
		),
	},
};
