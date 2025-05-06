import { Meta, StoryObj } from '@storybook/react';
import { ModalTrigger } from './ModalTrigger';
import { ModalConfirm } from '../ModalConfirm/ModalConfirm';

const meta: Meta<typeof ModalTrigger> = {
	title: 'Common/Layout/ModalTrigger',
	component: ModalTrigger,
	tags: ['autodocs'],
	args: {
		trigger: <button>Удалить элемент</button>,
		renderModal: (onClose: () => void) => (
			<ModalConfirm
				title="Удалить данные сотрудника?"
				text="Удалить"
				onClose={onClose}
				onConfirm={() => {
					onClose();
				}}
			>
				<p>Данные о сотруднике Яковлев Анатолий будут удалены</p>
			</ModalConfirm>
		),
	},
};

export default meta;

type Story = StoryObj<typeof ModalTrigger>;

export const WithConfirmModal: Story = {};
